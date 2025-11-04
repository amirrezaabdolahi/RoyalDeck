import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import SectionTitle from "@/components/SectionTitle";
import PlayerInfo from "@/components/PlayerInfo";

export default async function Home() {






  return (
    <div className="relative">
      <Header />
      {/* <Navbar /> */}
      <div className="container mx-auto">
        <SectionTitle text={"Current Deck"} />
        <PlayerInfo />
      </div>
    </div>
  );
}
