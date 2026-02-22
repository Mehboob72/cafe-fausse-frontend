from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
import os
import random
import re

# ============================================
# FLASK APP INITIALIZATION
# ============================================

app = Flask(__name__)
CORS(app)  # Enable Cross-Origin Resource Sharing

# ============================================
# DATABASE CONFIGURATION
# ============================================
DATABASE_URL = os.getenv(
    'DATABASE_URL',
    'postgresql://postgres:shan123@localhost:5432/cafe_fausse'
)

app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'your-secret-key-change-in-production'

# Initialize SQLAlchemy
db = SQLAlchemy(app)

# ============================================
# DATABASE MODELS
# ============================================

class Customer(db.Model):
    """Customer model - stores customer information"""
    __tablename__ = 'customers'
    
    customer_id = db.Column(db.Integer, primary_key=True)
    customer_name = db.Column(db.String(100), nullable=False)
    customer_email = db.Column(db.String(255), unique=True, nullable=False)
    phone_number = db.Column(db.String(20))
    newsletter_signup = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationship with reservations
    reservations = db.relationship('Reservation', backref='customer', lazy=True, cascade='all, delete-orphan')
    
    def to_dict(self):
        """Convert customer object to dictionary"""
        return {
            'customer_id': self.customer_id,
            'customer_name': self.customer_name,
            'customer_email': self.customer_email,
            'phone_number': self.phone_number,
            'newsletter_signup': self.newsletter_signup,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None
        }


class Reservation(db.Model):
    """Reservation model - stores table reservations"""
    __tablename__ = 'reservations'
    
    reservation_id = db.Column(db.Integer, primary_key=True)
    customer_id = db.Column(db.Integer, db.ForeignKey('customers.customer_id'), nullable=False)
    time_slot = db.Column(db.DateTime, nullable=False)
    table_number = db.Column(db.Integer, nullable=False)
    number_of_guests = db.Column(db.Integer, nullable=False)
    special_requests = db.Column(db.Text)
    status = db.Column(db.String(20), default='confirmed')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        """Convert reservation object to dictionary"""
        return {
            'reservation_id': self.reservation_id,
            'customer_id': self.customer_id,
            'customer_name': self.customer.customer_name if self.customer else None,
            'customer_email': self.customer.customer_email if self.customer else None,
            'time_slot': self.time_slot.isoformat() if self.time_slot else None,
            'table_number': self.table_number,
            'number_of_guests': self.number_of_guests,
            'special_requests': self.special_requests,
            'status': self.status,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }


# ============================================
# UTILITY FUNCTIONS
# ============================================

def validate_email(email):
    """Validate email format using regex"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def get_available_tables(time_slot):
    """
    Get list of available tables for a given time slot
    Checks 2-hour window (1 hour before and 1 hour after)
    """
    TOTAL_TABLES = 30  
    
    # Calculate time window
    time_start = time_slot - timedelta(hours=1)
    time_end = time_slot + timedelta(hours=2)
    
    # Query database for reserved tables in this window
    reserved_tables = db.session.query(Reservation.table_number).filter(
        Reservation.time_slot >= time_start,
        Reservation.time_slot <= time_end,
        Reservation.status == 'confirmed'
    ).all()
    
    # Convert to list of numbers
    reserved_table_numbers = [table[0] for table in reserved_tables]
    
    # Get available tables (all tables minus reserved ones)
    available_tables = [i for i in range(1, TOTAL_TABLES + 1) if i not in reserved_table_numbers]
    
    return available_tables


def assign_random_table(time_slot):
    """Assign a random available table for the given time slot"""
    available_tables = get_available_tables(time_slot)
    
    if not available_tables:
        return None  # No tables available
    
    return random.choice(available_tables)


# ============================================
# API ROUTES
# ============================================

@app.route('/')
def index():
    """Root endpoint - API information"""
    return jsonify({
        'message': 'Welcome to Café Fausse API',
        'version': '1.0.0',
        'status': 'running',
        'endpoints': {
            'health': '/api/health',
            'reservations': '/api/reservations',
            'customers': '/api/customers',
            'newsletter': '/api/newsletter/signup'
        }
    })


@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint - verify API and database are working"""
    try:
        # Test database connection
        db.session.execute(db.text('SELECT 1'))
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': datetime.utcnow().isoformat()
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500


# ============================================
# CUSTOMER ENDPOINTS
# ============================================

@app.route('/api/customers', methods=['GET'])
def get_customers():
    """Get all customers"""
    try:
        customers = Customer.query.all()
        return jsonify({
            'success': True,
            'customers': [customer.to_dict() for customer in customers],
            'count': len(customers)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/customers/<int:customer_id>', methods=['GET'])
def get_customer(customer_id):
    """Get specific customer by ID"""
    try:
        customer = Customer.query.get(customer_id)
        if not customer:
            return jsonify({
                'success': False,
                'error': 'Customer not found'
            }), 404
        
        return jsonify({
            'success': True,
            'customer': customer.to_dict()
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================
# RESERVATION ENDPOINTS
# ============================================

@app.route('/api/reservations', methods=['GET'])
def get_reservations():
    """Get all reservations"""
    try:
        reservations = Reservation.query.order_by(Reservation.time_slot.desc()).all()
        return jsonify({
            'success': True,
            'reservations': [reservation.to_dict() for reservation in reservations],
            'count': len(reservations)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/reservations', methods=['POST'])
def create_reservation():
    """Create a new reservation"""
    try:
        data = request.get_json()     
        # Validate required fields
        required_fields = ['customer_name', 'customer_email', 'time_slot', 'number_of_guests']
        for field in required_fields:
            if field not in data:
                return jsonify({
                    'success': False,
                    'error': f'Missing required field: {field}'
                }), 400
        
        # Validate email format
        if not validate_email(data['customer_email']):
            return jsonify({
                'success': False,
                'error': 'Invalid email format'
            }), 400
        
        # Parse time slot
        try:
            time_slot = datetime.fromisoformat(data['time_slot'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({
                'success': False,
                'error': 'Invalid time slot format. Use ISO format: YYYY-MM-DDTHH:MM:SS'
            }), 400
        
        # Check if time slot is in the future
        if time_slot < datetime.utcnow():
            return jsonify({
                'success': False,
                'error': 'Cannot make reservations for past dates'
            }), 400
        
        # Validate number of guests
        number_of_guests = int(data['number_of_guests'])
        if number_of_guests < 1 or number_of_guests > 12:
            return jsonify({
                'success': False,
                'error': 'Number of guests must be between 1 and 12'
            }), 400
        
        # Check table availability
        table_number = assign_random_table(time_slot)
        
        if table_number is None:
            return jsonify({
                'success': False,
                'error': 'Sorry, no tables available for this time slot. Please choose another time.',
                'available': False
            }), 409
        
        # Check if customer exists, if not create new customer
        customer = Customer.query.filter_by(customer_email=data['customer_email']).first()
        
        if not customer:
            customer = Customer(
                customer_name=data['customer_name'],
                customer_email=data['customer_email'],
                phone_number=data.get('phone_number'),
                newsletter_signup=data.get('newsletter_signup', False)
            )
            db.session.add(customer)
            db.session.flush()  # Get customer_id without committing
        else:
            # Update customer info if provided
            if 'phone_number' in data and data['phone_number']:
                customer.phone_number = data['phone_number']
            if 'newsletter_signup' in data:
                customer.newsletter_signup = data['newsletter_signup']
        
        # Create reservation
        reservation = Reservation(
            customer_id=customer.customer_id,
            time_slot=time_slot,
            table_number=table_number,
            number_of_guests=number_of_guests,
            special_requests=data.get('special_requests', '')
        )
        
        db.session.add(reservation)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reservation created successfully!',
            'reservation': reservation.to_dict(),
            'available': True
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/reservations/availability', methods=['POST'])
def check_availability():
    """Check if tables are available for a given time slot"""
    try:
        data = request.get_json()
        
        if 'time_slot' not in data:
            return jsonify({
                'success': False,
                'error': 'time_slot is required'
            }), 400
        
        try:
            time_slot = datetime.fromisoformat(data['time_slot'].replace('Z', '+00:00'))
        except ValueError:
            return jsonify({
                'success': False,
                'error': 'Invalid time slot format'
            }), 400
        
        available_tables = get_available_tables(time_slot)
        
        return jsonify({
            'success': True,
            'available': len(available_tables) > 0,
            'available_tables': len(available_tables),
            'time_slot': time_slot.isoformat()
        }), 200
        
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/reservations/<int:reservation_id>', methods=['DELETE'])
def cancel_reservation(reservation_id):
    """Cancel a reservation"""
    try:
        reservation = Reservation.query.get(reservation_id)
        
        if not reservation:
            return jsonify({
                'success': False,
                'error': 'Reservation not found'
            }), 404
        
        reservation.status = 'cancelled'
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Reservation cancelled successfully'
        }), 200
        
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================
# NEWSLETTER ENDPOINTS
# ============================================

@app.route('/api/newsletter/signup', methods=['POST'])
def newsletter_signup():
    """Sign up for newsletter"""
    try:
        data = request.get_json()
        
        # Validate email
        if 'email' not in data:
            return jsonify({
                'success': False,
                'error': 'Email is required'
            }), 400
        
        if not validate_email(data['email']):
            return jsonify({
                'success': False,
                'error': 'Invalid email format'
            }), 400
        
        # Check if customer already exists
        customer = Customer.query.filter_by(customer_email=data['email']).first()
        
        if customer:
            if customer.newsletter_signup:
                return jsonify({
                    'success': True,
                    'message': 'You are already subscribed to our newsletter!',
                    'already_subscribed': True
                }), 200
            else:
                customer.newsletter_signup = True
                db.session.commit()
                return jsonify({
                    'success': True,
                    'message': 'Successfully subscribed to newsletter!',
                    'already_subscribed': False
                }), 200
        else:
            # Create new customer
            customer = Customer(
                customer_name=data.get('name', 'Newsletter Subscriber'),
                customer_email=data['email'],
                phone_number=data.get('phone'),
                newsletter_signup=True
            )
            db.session.add(customer)
            db.session.commit()
            
            return jsonify({
                'success': True,
                'message': 'Successfully subscribed to newsletter!',
                'already_subscribed': False
            }), 201
            
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


@app.route('/api/newsletter/subscribers', methods=['GET'])
def get_subscribers():
    """Get all newsletter subscribers"""
    try:
        subscribers = Customer.query.filter_by(newsletter_signup=True).all()
        return jsonify({
            'success': True,
            'subscribers': [customer.to_dict() for customer in subscribers],
            'count': len(subscribers)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500


# ============================================
# ERROR HANDLERS
# ============================================

@app.errorhandler(404)
def not_found(error):
    """Handle 404 errors"""
    return jsonify({
        'success': False,
        'error': 'Endpoint not found'
    }), 404


@app.errorhandler(500)
def internal_error(error):
    """Handle 500 errors"""
    db.session.rollback()
    return jsonify({
        'success': False,
        'error': 'Internal server error'
    }), 500


# ============================================
# APPLICATION ENTRY POINT
# ============================================

if __name__ == '__main__':
    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()
        print(" Database tables created successfully!")
    
    # Run the Flask application
    print("\n Starting Café Fausse Backend Server...")
    print(" Server running at: http://localhost:5000")
    print(" Press Ctrl+C to stop the server\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
