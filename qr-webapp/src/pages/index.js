import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSheetData } from "@/lib/GoogleSheetsUtil";
import Pusher from 'pusher-js';


export default function ConferenceRegistration() {
  const [participantID, setParticipantID] = useState("");
  const [clientID, setClientID] = useState("5bf8fed6-8e92-4618-9bba-1603e5dc736e");
  const [formData, setFormData] = useState({});

  // google keys
  const apiKey = "AIzaSyCUs7V2XpnGPXPJ0-geJgrP8aaapGnfYKc";
  const sheetId = "1m_6V_a1IKWf5JhpaSeWLGAwzMHUNpsH6mnX5qJSBXMs";
  const range = "Sheet1"; 

  // pusher keys
  const pusherKey = "49aa52159c63a33968f8";
  const pusherCluster = "ap1";

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSheetData(sheetId, range, apiKey);

        const headers = data[0];
        const rows = data.slice(1);
        const record = rows.find((row) => row[0] === participantID);

        if (record) {
          const recordData = headers.reduce(
            (obj, key, index) => ({ ...obj, [key]: record[index] }),
            {}
          );
          console.log('Fetched participant', recordData)
          setFormData(recordData);
        }
      } catch (error) {
        console.error("Error fetching Google Sheets data:", error);
      }
    }

    fetchData();
  }, [participantID]);

  useEffect(() => {
    let channel; // Declare channel outside to ensure proper cleanup
  
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });
  
    const subscribeToChannel = () => {
      channel = pusher.subscribe(clientID); // Subscribe to the current clientID channel
      console.log(`Subscribed to channel: ${clientID}`);
  
      // Bind to the event
      channel.bind('update-participant-id', (data) => {
        if (data.participantID) {
          setParticipantID(data.participantID); // Update participantID
        }
      });

      // reset data
      setParticipantID("")
      setFormData({})
    };
  
    // Subscribe to the channel
    subscribeToChannel();
  
    // Cleanup on unmount or when clientID changes
    return () => {
      if (channel) {
        console.log(`Unsubscribing from channel: ${clientID}`);
        channel.unbind_all(); // Unbind all events
        channel.unsubscribe(); // Unsubscribe from channel
      }
    };
  }, [clientID]); // Dependency on clientID to resubscribe when it changes
  
  useEffect(() => {
    setFormData({}); // Reset formData whenever clientID changes
  }, [clientID]);
  
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
            <select
            className="ml-auto border border-white rounded-md p-2 text-white hover:text-black hover:border-gray-300"
            onChange={(e) => setClientID(e.target.value)}
            >
            <option value="5bf8fed6-8e92-4618-9bba-1603e5dc736e">Client 1</option>
            <option value="7ddf697b-732a-4a25-b74f-a4d5f482ef10">Client 2</option>
            <option value="66d71bd5-9adc-4c53-bc84-0527caf29dfb">Client 3</option>
            </select>
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
