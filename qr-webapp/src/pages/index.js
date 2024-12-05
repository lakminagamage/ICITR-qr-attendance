import { useState, useEffect } from "react";
import Image from "next/image";
import { getSheetData } from "@/lib/GoogleSheetsUtil";
import Pusher from 'pusher-js';
import NavBar from "@/components/NavBar";
import Background from "@/components/Background";
import Footer from "@/components/Footer";
import AuthorDetailsForm from "@/components/AuthorDetailsForm";
import { Card, CardContent } from "@/components/ui/card";

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
        <main className="mt-12 flex-1 container max-w-full py-8 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            <div className="w-full lg:w-1/3 max-w-md flex justify-center mt-10 lg:mt-24">
              <Card className="w-full max-w-xs">
                <CardContent className="p-3">
                  <Image
                    src={profilePictureUrl}
                    alt="Profile Picture Upload Area"
                    width={350}
                    height={400}
                    className="w-full rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            </div>
            <div className="w-full lg:w-2/3 py-[7%]">
              <AuthorDetailsForm formData={formData} setFormData={setFormData} />
            </div>
          </div>
        </main>
      </Background>
      <Footer />
    </div>
  );
}
