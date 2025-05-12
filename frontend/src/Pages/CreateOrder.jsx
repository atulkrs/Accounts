import React, { useState } from "react";

const CreateOrder = () => {
  const [deliveryLocation, setDeliveryLocation] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [items, setItems] = useState([
    { product: "", quantity: "", details: "" }, // quantity starts as an empty string
  ]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { product: "", quantity: "", details: "" }]); // new item starts with an empty quantity
  };

  const removeItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const order = { customer, deliveryLocation, scheduledDate, items };
    console.log("Order submitted:", order);
    // You can call an API here to save the order
  };

  return (
    <div className='max-w-xl mx-auto p-6 bg-white rounded shadow-md'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Create New Order</h2>
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Customer Selection */}
        <div>
          <label className='block font-medium mb-1'>Customer Name</label>
          <input
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2'
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder='Enter Customer Name'
            required
          />
        </div>

        <div>
          <label className='block font-medium mb-1'>Delivery Location</label>
          <input
            type='text'
            className='w-full border border-gray-300 rounded px-3 py-2'
            value={deliveryLocation}
            onChange={(e) => setDeliveryLocation(e.target.value)}
            placeholder='Enter delivery address'
            required
          />
        </div>

        <div>
          <label className='block font-medium mb-1'>Scheduled Date</label>
          <input
            type='date'
            className='w-full border border-gray-300 rounded px-3 py-2'
            value={scheduledDate}
            onChange={(e) => setScheduledDate(e.target.value)}
            required
          />
        </div>

        <div>
          <h3 className='font-medium mb-2'>Order Items</h3>
          {items.map((item, index) => (
            <div key={index} className='border p-4 rounded mb-4'>
              <div className='flex gap-4'>
                <div className='flex-1'>
                  <label className='block font-medium mb-1'>Product</label>
                  <input
                    type='text'
                    className='w-64 border border-gray-300 rounded px-3 py-2' // Increased width for product field
                    value={item.product}
                    onChange={(e) =>
                      handleItemChange(index, "product", e.target.value)
                    }
                    placeholder='Enter product'
                    required
                  />
                </div>
                <div className='flex-1 w-1/4'>
                  {" "}
                  <label className='block font-medium mb-1'>Quantity</label>
                  <input
                    type='text' // Changed from number to text so that quantity can be empty
                    className='w-36 border border-gray-300 rounded px-3 py-2'
                    value={item.quantity}
                    onChange={(e) =>
                      handleItemChange(index, "quantity", e.target.value)
                    }
                    placeholder='Enter quantity'
                  />
                </div>

                <div className='flex items-center justify-center'>
                  <button
                    type='button'
                    onClick={() => removeItem(index)}
                    className='text-red-600'
                  >
                    &times; Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Add Item Button */}
          <button
            type='button'
            onClick={addItem}
            className='text-blue-600 hover:underline text-sm mt-2'
          >
            + Add Item
          </button>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700'
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateOrder;
