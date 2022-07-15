import "./style.css";

const DeliveryInfo = () => {
  return (
    <div className="AboutUs">
      <h1 className="OverviewH">Delivery Information</h1>
      <ul className="Overview">
        <li>
          Please note that orders must be placed by 5 pm, otherwise they will be
          processed the next day.{" "}
        </li>
        <li>
          Please note that orders are delivered only on working days i.e no
          deliveries are made on Fridays/Bank Holidays/Public Holidays.
        </li>
        <li>
          {" "}
          The flat shipping rate valid only for shipment weight max 5Kgs other
          wise the shipping rates calculate per weight.{" "}
        </li>
        <li>
          If an order is placed before 5 pm and item is available, the order
          should be ready for collection (Please wait for collection email) on
          next day (25% Avg) or after 2 days(50% Avg) or after 3 days(25% Avg)
        </li>
      </ul>

      <h1>Who Deliver</h1>
      <p className="Products">
        {" "}
        In order for the couriers to successfully and promptly deliver an order,
        customers must be available to receive and sign for that order. Couriers
        will not leave a package unattended at a door, the driver must obtain a
        signature and printed name to complete the delivery. As a customer has
        selected to obtain there products from an online company, DEVA SHOP
        Computers expects the customer to be available at the delivery address
        to receive. Customers who are at work daily, or constantly on the road
        should select to deliver their goods to a place of work or maybe a
        neighbour of friend that is available to receive. The Couriers will not
        guarantee a window of delivery; they can delivery anytime during a
        business day. Delivery will usually take place the day after you receive
        a dispatch email from our warehouse, but in some cases it will be the
        second day after receipt of the email.
        <br />
        Customers requesting a delivery to a company should note the delivery
        will probably not be made directly to them, but will be signed for at
        goods in, post room or reception area.
        <br />
        Should a customer not be at home after the first attempt to deliver,
        couriers will leave a calling card with contact information. Using the
        information on the calling card, the customer should get in contact with
        the courier to make arrangements to attempt a second delivery. If no
        contact is made within 24 Hours holding period the package will be
        returned to DEVA SHOP For Computers for collection from our warehouse.
        Should a customer request a second dispatch they will be charged another
        delivery.
        <br />
        The couriers are supplied with a customer contact number; however, it is
        not their policy to call a customer before they attempt delivery. The
        number is supplied for the courier ’s convenience, and for them to use
        should they have a problem.
      </p>

      <h1>Where We Deliver And How Much It Costs</h1>
      <p className="Logistics">
        {" "}
        DevaShop Computers only deliver to Jordan. We will not deliver to any
        other countries at this point in time, mainly because the cost of
        delivery is too expensive and negates the advantage of ordering from us.
        <br />
        The Delivery costs below include VAT and are calculated from the time
        payment is processed. They are based on an order weighing less than
        10kg. Orders over 10kg will be palletised due to health and safety
        reasons, and will be quoted by our logistics department before dispatch.
        Please note that due to the lack of accurate product weight information
        we are unable to notify a customer of a higher delivery charge at order
        placement. Should a customer suspect a higher delivery charge they can
        email our logistics department prior to order placement to verify.
      </p>

      <h1>Collections</h1>
      <p
        className="Customer_Service
"
      >
        {" "}
        A customer can select to collect there order from our warehouse .
        Notification of order readiness is conducted by email from our warehouse
        when the products become available. This availability can take 1-2 days
        depending on stock levels and payment processing.
        <br />
        Customers should not attempt collection until they have received the
        collection notification or the online status of the order is at
        ‘Awaiting Collection’.
        <br />
        Once a customer has been notified of collection readiness we request
        that the collection is made within 5 business days. After five days, if
        we have not received notification from the customer as to the reason for
        the delay in collecting, a daily storage charge of 5JD will be added to
        the order. DEVA SHOP For Computers must enforce this charge as we have
        very limited space to store customers’ orders and delays in pick up
        cause operational difficulties. Customers should email our logistics
        department to explain a delay in collection at which time we will waive
        a storage fee.
        <br />
        Your order can be collected anytime between 8AM to 6PM, Saturday TO
        Wednesday (excluding holidays). Please remember to wait for your
        collection email.
      </p>
      <br/><br/>
    </div>
  );
};

export default DeliveryInfo;
