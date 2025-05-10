import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import "./App.css";

function App() {
  const [startGame, setStartGame] = useState(false);
  const [data1, setData1] = useState([]);
  const [point, setPoint] = useState(0)
  const urlsToFetch = [
    "https://dog.ceo/api/breeds/image/random",
    "https://api.thecatapi.com/v1/images/search?limit=10",
  ];

  const fetchPromises = urlsToFetch.map((url) =>
    fetch(url).then((response) => response.json())
  );
  useEffect(() => {
    Promise.all(fetchPromises)
      .then((responses) => {
        const responseData = responses.map((response) => response);
        setData1(responseData);
        console.log("Fetched data:", responseData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {!startGame ? (
        <div className="bg-green-950 relative flex-col text-white flex justify-center items-center w-full h-[100dvh]">
          <h1 className="font-bold absolute top-[40px] text-[20px] left-[40px]">
            DogFinder
          </h1>
          <div className="flex flex-col mb-[150px] gap-[30px] justify-center items-center">
            <h1 className="font-bold text-[32px]">Start dog finder game</h1>
            <p className="text-center">
              You will have to choose an image of a <br /> dog from 5 total
              pictures, try to get the highest score
            </p>
            <button
              onClick={() => setStartGame(true)}
              className="bg-[#33D570] h-[40px] cursor-pointer rounded-[12px] w-[126px]"
            >
              Start Game
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="bg-green-950 relative flex-col text-white flex justify-center items-center w-full h-[100dvh]">
            <h1 className="font-bold absolute top-[40px] text-[20px] left-[40px]">
              DogFinder
            </h1>

            <img  className="w-[400px] blur-md h-[300px] object-cover" src={data1[0].message} alt="" />
              <div className="flex">
            {data1[1].map((el) => (

              <img className="w-[400px] blur-md h-[300px] object-cover" key={el.id} src={el.url} alt="" />
            ))}
          </div></div>
        </div>
      )}
    </div>
  );
}

export default App;
