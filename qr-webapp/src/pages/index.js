import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSheetData } from "@/lib/GoogleSheetsUtil";
import Pusher from 'pusher-js';
import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import Footer from "@/components/Footer";

export default function ConferenceRegistration() {
  const [participantID, setParticipantID] = useState("ICITR2024001");
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


  function transformGoogleDriveLink(originalLink) {
    if (typeof originalLink !== "string" || !originalLink.includes("id=")) {
      console.error("Invalid link format:", originalLink);
      return null;
    }
  
    const match = originalLink.match(/id=([\w-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      return `https://drive.usercontent.google.com/download?id=${fileId}&export=view`;
    }
  
    console.error("Unable to extract file ID from link:", originalLink);
    return null;
  }
  
  const profilePictureUrl = transformGoogleDriveLink(formData.Photo);


  return (
    <div className="min-h-screen flex flex-col">
      <Background>
        <NavBar setClientID={setClientID} />
        <main className="mt-12 flex-1 container max-w-7xl mx-auto py-8 px-4">
          <div className="grid md:grid-cols-[1fr,1fr] gap-8 items-start">
            <div className="w-full max-w-md mx-auto">
              <Card className="w-full">
                <CardContent className="p-3">
                  <Image
                    src={profilePictureUrl}
                    alt="Profile Picture Upload Area"
                    width={700}
                    height={800}
                    className="w-full rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
            <Card className="w-[1000px] bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg">
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
                          placeholder="Name"
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
                            setFormData({ ...formData, Registration_Type: e.target.value })
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
      </Background>
      <Footer />
    </div>
  );
}
