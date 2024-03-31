import Header from "./Components/Board/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import styles from "./page.module.css";
import boards from "../data.json";

export default function Home() {

  console.log(boards)

  return (
    <>
      <Header />
      <SideBar boards={boards.boards} />
    </>
  );
}
