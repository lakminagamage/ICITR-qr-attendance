import AuthorDetail from "./authorDetail";
import Navbar from '../components/Navbar'; // Ensure correct casing

export default function Home(){
  return(
    <div className="bg-white min-h-screen">
      <AuthorDetail/>
    </div>
  );
}