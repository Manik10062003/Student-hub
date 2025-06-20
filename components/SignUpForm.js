"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function SignUpForm() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    college: "",
    branch: "",
    specialization: "",
    passingYear: "",
    email: "",
    password: "",
    agreed: false,
  });

  const currentYear = new Date().getFullYear();
  const passingYears = Array.from({ length: 9 }, (_, i) => currentYear + i);

  const colleges = [
    "IIT Delhi",
    "IIT Bombay",
    "NIT Trichy",
    "NSUT Delhi",
    "DTU Delhi",
    // Add more or load from utils/colleges.js
  ];

  const branches = [
    "CSE",
    "ECE",
    "Mechanical",
    "Electrical",
    "Civil",
    "Chemical",
    // Add more or load from utils/branches.js
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!form.agreed) {
    alert("Please agree to the terms & conditions");
    return;
  }
  try {
    const res = await fetch("/api/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    alert(data.message);
  } catch (err) {
    alert(err.message);
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001F3F] px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Create Free Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="flex gap-2">
              <Input
                name="firstName"
                placeholder="First Name"
                value={form.firstName}
                onChange={handleChange}
              />
              <Input
                name="lastName"
                placeholder="Last Name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>

            <select
              name="college"
              value={form.college}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select College</option>
              {colleges.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            <select
              name="branch"
              value={form.branch}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Select Branch</option>
              {branches.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <Input
              name="specialization"
              placeholder="Specialization"
              value={form.specialization}
              onChange={handleChange}
            />

            <select
              name="passingYear"
              value={form.passingYear}
              onChange={handleChange}
              className="w-full border rounded p-2"
            >
              <option value="">Passing Year</option>
              {passingYears.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
            />

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agreed"
                checked={form.agreed}
                onChange={handleChange}
              />
              I agree to terms & conditions
            </label>

            <Button type="submit" className="w-full bg-yellow-400 text-[#001F3F] hover:bg-yellow-500">
              Create Free Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
