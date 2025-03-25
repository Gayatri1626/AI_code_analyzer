def calculate_total(orders):
    """Calculate total order value."""
    return sum(order['value'] for order in orders)