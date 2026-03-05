import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";

function ServiceForm({ onSubmit }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <Input
        label="Service Name"
        name="name"
        value={form.name}
        onChange={handleChange}
      />

      <Input
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />

      <Input
        label="Price"
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
      />

      <Button type="submit">Save Service</Button>
    </form>
  );
}

export default ServiceForm;
