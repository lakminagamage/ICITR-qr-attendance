import axios from "axios";

export async function getSheetData(sheetId, range, apiKey) {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
  console.log("Request URL:", url);

  try {
    const response = await axios.get(url);
    return response.data.values;
  } catch (error) {
    console.error("Error fetching data from Google Sheets:", error.response?.data || error.message);
    throw error;
  }
}
