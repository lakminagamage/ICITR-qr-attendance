import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSheetData } from "@/lib/GoogleSheetsUtil";
import Pusher from 'pusher-js';


export default function ConferenceRegistration() {
  const [participantID, setParticipantID] = useState("ICITR20241001");
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
    let channel;
  
    const pusher = new Pusher(pusherKey, {
      cluster: pusherCluster,
    });
  
    const subscribeToChannel = () => {
      channel = pusher.subscribe(clientID);
      console.log(`Subscribed to channel: ${clientID}`);
  
      channel.bind('update-participant-id', (data) => {
        if (data.participantID) {
          setParticipantID(data.participantID);
        }
      });

      setParticipantID("")
      setFormData({})
    };
  
    subscribeToChannel();
  
    return () => {
      if (channel) {
        console.log(`Unsubscribing from channel: ${clientID}`);
        channel.unbind_all(); 
        channel.unsubscribe(); 
      }
    };
  }, [clientID]); 
  
  useEffect(() => {
    setFormData({}); 
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
            <Card className="w-full">
              <CardContent className="p-4 ">
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

          <Card className="w-[1000px]">
            <CardHeader>
              <CardTitle>Author Details</CardTitle>
              <p className="text-sm text-muted-foreground">
                Please confirm if your details below here are accurate
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="firstName">Name</Label>
                      <Input
                        id="firstName"
                        value={formData.Title + " " + formData.Name_With_Initials || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, firstname: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="lastName">Contact Number</Label>
                      <Input
                        id="lastName"
                        placeholder="person@mail.com"
                        value={formData.Email || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, lastname: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                    <Label htmlFor="email">Contact</Label>
                    <Input
                      id="contact"
                      type="contact"
                      placeholder="070 1234567"
                      value={formData.Contact_Number || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="address">University/Institution</Label>
                    <Input
                      id="address"
                      placeholder="Add Address"
                      value={formData.University || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="age">Locality</Label>
                      <Input
                        id="age"
                        placeholder="Sri Lankan"
                        value={formData.Locality || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, Locality: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="gender">Registration Type</Label>
                      <Input
                        id="gender"
                        placeholder="Student/Non-Student"
                        value={formData.Registration_Type || ""}
                        onChange={(e) =>
                          setFormData({ ...formData,   Registration_Type: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="nic">Paper Title</Label>
                    <Input
                      id="nic"
                      placeholder="Add NIC"
                      value={formData.Paper_Title || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, Paper_Title: e.target.value })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="nic">Corresponding Author</Label>
                      <Input
                        id="nic"
                        placeholder="Corresponding Author"
                        value={formData.Corresponding_Author || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, Corresponding_Author: e.target.value })
                        }
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="nic">Presenting Author</Label>
                      <Input
                        id="nic"
                        placeholder="Presenting Author"
                        value={formData.Presenting_Author_Name || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, Presenting_Author_Name: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid gap-2">
                      <Label htmlFor="nic">Co-Authors</Label>
                      <Input
                        id="nic"
                        placeholder="Co-Authors"
                        value={formData.Co_Author_Names || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, Co_Author_Names: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="nic">IEEE Membership Status</Label>
                        <Input
                          id="nic"
                          placeholder="Yes/No"
                          value={formData.IEEE_Membership || ""}
                          onChange={(e) =>
                            setFormData({ ...formData, IEEE_Membership: e.target.value })
                          }
                        />
                      </div>

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
