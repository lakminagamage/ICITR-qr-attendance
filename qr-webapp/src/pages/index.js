import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSheetData } from "@/lib/GoogleSheetsUtil";


export default function ConferenceRegistration() {
  const [id, setId] = useState("ICITR20241000");
  const [formData, setFormData] = useState({});
  const apiKey = "AIzaSyCUs7V2XpnGPXPJ0-geJgrP8aaapGnfYKc";
  const sheetId = "1m_6V_a1IKWf5JhpaSeWLGAwzMHUNpsH6mnX5qJSBXMs";
  const range = "Sheet1"; 

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSheetData(sheetId, range, apiKey);

        const headers = data[0];
        const rows = data.slice(1);
        const record = rows.find((row) => row[0] === id);

        if (record) {
          const recordData = headers.reduce(
            (obj, key, index) => ({ ...obj, [key]: record[index] }),
            {}
          );
          setFormData(recordData);
        }
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    }

    fetchData();
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col bg-[#E6EDF9]">
      <header className="w-full bg-white py-4 px-6 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Image
            src="/window.svg"
            alt="ICITR 2024 Logo"
            width={80}
            height={80}
            className="object-contain"
          />
          <h1 className="text-2xl md:text-3xl font-medium text-black">
            International Conference on Information Technology Research - 2024
          </h1>
        </div>
      </header>

      <main className="flex-1 container max-w-7xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-[1fr,1fr] gap-8 items-start">
          <div className="w-full max-w-md mx-auto">
            <Card>
              <CardContent className="p-4">
                <Image
                  src="/user.jpg"
                  alt="Profile Picture Upload Area"
                  width={700}
                  height={800}
                  className="w-full rounded-lg object-cover"
                />
              </CardContent>
            </Card>
          </div>

          <Card className="w-full">
            <CardHeader>
              <CardTitle>Author Details</CardTitle>
              <p className="text-sm text-muted-foreground">
                Please confirm if your details below here are accurate
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      placeholder="John Doe"
                      value={formData.firstname || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, firstname: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastname || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, lastname: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.doe@example.com"
                      value={formData.email || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      placeholder="Add Address"
                      value={formData.address || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        placeholder="34"
                        value={formData.age || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Sex</Label>
                      <Input
                        id="gender"
                        placeholder="Male"
                        value={formData.gender || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="nic">NIC Number</Label>
                    <Input
                      id="nic"
                      placeholder="Add NIC"
                      value={formData.nic || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, nic: e.target.value })
                      }
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="w-full bg-[#1a237e] text-white py-4 px-6 mt-8">
        <div className="max-w-7xl mx-auto text-center text-sm">
          © 2024 Information Technology Research Unit. Faculty of Information Technology University of Moratuwa.
        </div>
      </footer>
    </div>
  );
}
