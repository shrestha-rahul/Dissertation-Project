import React from "react";
import Card from "./components/Card";
import Greetings from "./components/Greetings";
import CardTitle from "./components/CardTitle";
import ChartStock from "./components/stock/ChartStock";
import StockItem from "./components/stock/StockItem";
import GainersItem from "./components/stock/GainersItem";
import ChartEnterTicket from "./components/stock/ChartEnterTicket";

//Images
import arrowUp from "./assets/arrowup.svg";
import bullet from "./assets/3bullet.svg";
import apple from "./assets/apple.svg";
import amazon from "./assets/amazon.svg";
import tesla from "./assets/tesla.svg";
import google from "./assets/google.svg";
import form_ilu from "./assets/form-ilu.svg";
import news_ilu from "./assets/news-ilu.svg";

function Stock() {
  return (
    <>
      {/* Main Content */}
      <div className="w-[87%] py-4">
        <div className="p-4 min-h-screen flex ">
          <div className="border-2 border-gray-800 w-full min-h-full flex p-4 space-x-4">
            {/* Left Section */}
            <div className="w-[35%] space-y-4 flex flex-col">
              <Greetings>Hello, Rahul</Greetings>

              {/* Investment Portfolio Card */}
              <Card className="items-center">
                <CardTitle
                  removeButton="true"
                  className="w-[80%] justify-center"
                >
                  Invesment Portfolio
                </CardTitle>
                <div className="w-full">
                  <span className="underline underline-offset-4">
                    Total Balance
                  </span>
                  <div className="flex mt-2">
                    <span>£3,000</span>
                    <img src={arrowUp} alt="" />
                    <span>£28.62 (13%)</span>
                  </div>
                </div>
                <ChartStock />
                <div className="flex flex-col w-full">
                  <div className="flex justify-between w-full items-center">
                    <span className="underline underline-offset-4">Stocks</span>
                    <img src={bullet} alt="" />
                  </div>

                  {/* Loop Your Stocks */}
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <StockItem
                      name="Apple Inc. (AAPL)"
                      value="£1000"
                      percentage="+23.79 (+2.58%)"
                      image={apple}
                    />
                    <StockItem
                      name="Aamzon Inc. (AMZN)"
                      value="£1000"
                      percentage="+23.79 (+2.58%)"
                      image={amazon}
                    />
                    <StockItem
                      name="Tesla Inc. (TSLA)"
                      value="£1000"
                      percentage="+23.79 (+2.58%)"
                      image={tesla}
                    />
                  </div>
                </div>
              </Card>
              {/* End of Investment Portfolio Card */}

              {/* Gainers Stock Card */}
              <Card className="items-center">
                <CardTitle
                  removeButton="true"
                  className="w-[80%] justify-center"
                >
                  Gainers
                </CardTitle>
                <div className="flex flex-col w-full space-y-2">
                  <GainersItem
                    name="Apple Inc. (AAPL)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={apple}
                  />
                  <GainersItem
                    name="Aamzon Inc. (AMZN)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={amazon}
                  />
                  <GainersItem
                    name="Tesla Inc. (TSLA)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={tesla}
                  />
                  <GainersItem
                    name="Alphabet Inc. (GOOG)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={google}
                  />
                </div>
              </Card>
              {/* End Gainers Stock Card */}

              {/* Losers Stock Card */}
              <Card className="items-center">
                <CardTitle
                  removeButton="true"
                  className="w-[80%] justify-center"
                >
                  Losers
                </CardTitle>
                <div className="flex flex-col w-full space-y-2">
                  {/* Loop Here */}
                  <GainersItem
                    name="Apple Inc. (AAPL)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={apple}
                    lose="true"
                  />
                  <GainersItem
                    name="Aamzon Inc. (AMZN)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={amazon}
                    lose="true"
                  />
                  <GainersItem
                    name="Tesla Inc. (TSLA)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={tesla}
                    lose="true"
                  />
                  <GainersItem
                    name="Alphabet Inc. (GOOG)"
                    value="£1000"
                    percentage="+23.79 (+2.58%)"
                    image={google}
                    lose="true"
                  />
                </div>
              </Card>
              {/* End Losers Stock Card */}
            </div>
            {/* End of Left Section */}

            {/* Right Section */}
            <div className="w-[65%] space-y-4 flex flex-col">
              {/* Stock Price Prediction Card */}
              <Card row="true" className="space-x-2">
                {/* Left Part */}
                <div className="w-[60%] flex">
                  {/* Stock Graph*/}
                  <div className="w-[60%]">
                    <span>Enter Ticker $:</span>
                    <div className="flex border-b-2 border-gray-800 items-center pb-2">
                      <div>
                        <span>Bitcoin / USD</span>
                        <p>Crypto</p>
                      </div>
                      <div>
                        <img src={arrowUp} alt="" />
                      </div>
                    </div>
                    <ChartEnterTicket />
                  </div>
                  {/* End Stock Graph */}

                  {/* Stock Info */}
                  <div className="w-[40%]">
                    <div className="flex border-b-2 border-gray-800 pb-2 space-x-2 items-center">
                      <input type="checkbox" />
                      <span>Forcast Prices?</span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 my-2 ">
                        <p className="text-xs">TODAY </p>
                        <div className="w-full h-[2px] bg-black"></div>
                      </div>
                      <div className="flex space-x-2">
                        <div>
                          <span className="text-[#02E1DB] text-base">
                            $3650.57
                          </span>
                          <p className="text-xs italic">CURRENT PRICE</p>
                        </div>
                        <div>
                          <span className="text-[#02E1DB] text-base">
                            {" "}
                            $165 (+5%)
                          </span>
                          <p className="text-xs italic">TODAY CHANGE</p>
                        </div>
                      </div>
                      <div className="my-3">
                        <h5 className="text-base">6,694,659</h5>
                        <p className="text-xs italic">24H VOLUME</p>
                      </div>
                      <div>
                        <div className="h-2 bg-[#43405A] rounded-lg">
                          <div className="h-2 bg-[#02E1DB] rounded-lg w-[30%] ml-3"></div>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-xs text-[#FF4991]">3534.68</p>
                          <p className="text-xs">DAY RANGE</p>
                          <p className="text-xs text-[#02E1DB]">3895.31</p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom */}

                    <div>
                      <div className="flex items-center space-x-2 my-2 ">
                        <p className="text-xs whitespace-nowrap">
                          SELECTED PERIOD
                        </p>
                        <div className="w-full h-[2px] bg-black"></div>
                      </div>
                      <div className="my-3">
                        <h5 className="text-base">$6587.56</h5>
                        <p className="text-xs italic">STARTING PRICE</p>
                      </div>
                      <div className="my-3">
                        <h5 className="text-base text-[#FF4991]">
                          $2.936,99 (-5%)
                        </h5>
                        <p className="text-xs italic ">PERIOD CHANGE</p>
                      </div>
                      <div>
                        <div className="h-2 bg-[#43405A] rounded-lg">
                          <div className="h-2 bg-[#FF4991] rounded-lg w-[30%] ml-3"></div>
                        </div>
                        <div className="flex justify-between">
                          <p className="text-xs text-[#FF4991]">3534.68</p>
                          <p className="text-xs">DAY RANGE</p>
                          <p className="text-xs text-[#02E1DB]">3895.31</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* End Stock Info */}
                </div>
                {/* End Left Part */}

                {/* Right Part */}
                <div className="w-[40%]">
                  {/* Price Table */}
                  <table className="w-full border h-full border-slate-500 text-center">
                    <thead>
                      <tr>
                        <th className="border border-slate-600">Date</th>
                        <th className="border border-slate-600">Open</th>
                        <th className="border border-slate-600">Close</th>
                        <th className="border border-slate-600">Predicted</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                      <tr>
                        <td className="border border-slate-600">21-03-2022</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                        <td className="border border-slate-600">$3301</td>
                      </tr>
                    </tbody>
                  </table>
                  {/* End Price Table */}
                </div>
                {/* End Right Part */}
              </Card>
              {/* End Stock Prediction Card */}

              {/* Bottom Half */}
              <div className="flex space-x-4 grow">
                {/* Stock Recommender  */}
                <div className="w-[60%] flex">
                  <Card row="true" className="space-x-2 grow">
                    {/* Recommender */}
                    <div className="w-[50%]">
                      <CardTitle removeButton="true" className="justify-center">
                        Stock Recommender
                      </CardTitle>
                      <form action="" className="space-y-2 mb-4">
                        <div className="flex flex-col items-center">
                          <label htmlFor="" className="font-bold">
                            Invesment Amount
                          </label>
                          <input
                            type="text"
                            placeholder="£3000"
                            className="rounded-lg border-2 border-gray-800 px-2 text-center w-full"
                          />
                        </div>
                        <div className="flex flex-col items-center">
                          <label htmlFor="" className="font-bold">
                            Invesment Duration
                          </label>
                          <input
                            type="text"
                            placeholder="£3000"
                            className="rounded-lg border-2 border-gray-800 px-2 text-center w-full"
                          />
                        </div>
                        <div className="flex flex-col items-center">
                          <label htmlFor="" className="font-bold">
                            Profit Req
                          </label>
                          <input
                            type="text"
                            placeholder="£3000"
                            className="rounded-lg border-2 border-gray-800 px-2 text-center w-full"
                          />
                        </div>
                      </form>
                      <img src={form_ilu} alt="" />
                    </div>
                    {/* End Recommmender */}

                    {/* Result Table */}
                    <div className="w-[50%]">
                      <table className="w-full border h-full border-slate-500 text-center">
                        <thead>
                          <tr>
                            <th className="border border-slate-600">Date</th>
                            <th className="border border-slate-600">Open</th>
                            <th className="border border-slate-600">Close</th>
                            <th className="border border-slate-600">
                              Predicted
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                          <tr>
                            <td className="border border-slate-600">
                              21-03-2022
                            </td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                            <td className="border border-slate-600">$3301</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    {/* End Results Table */}
                  </Card>
                </div>
                {/* End Stock Recommender */}

                {/* News  Guides */}
                <div className="w-[40%] flex">
                  <Card className="items-center grow">
                    <CardTitle removeButton="true" className="justify-center">
                      News & Guides
                    </CardTitle>
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <div className="border-2 border-gray-800 rounded-lg h-fit">
                          <img
                            src={news_ilu}
                            className="min-w-[90px] h-[100px]"
                            alt=""
                          />
                        </div>
                        <p className="text-xs italic">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <p className="text-xs italic">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                        </p>
                        <div className="border-2 border-gray-800 rounded-lg h-fit">
                          <img
                            src={news_ilu}
                            className="min-w-[90px] h-[100px]"
                            alt=""
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="border-2 border-gray-800 rounded-lg h-fit">
                          <img
                            src={news_ilu}
                            className="min-w-[90px] h-[100px]"
                            alt=""
                          />
                        </div>
                        <p className="text-xs italic">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <p className="text-xs italic">
                          Cras sit amet nibh libero, in gravida nulla. Nulla vel
                          metus scelerisque ante sollicitudin. Cras purus odio,
                          vestibulum in vulputate at, tempus viverra turpis.
                          Fusce condimentum nunc ac nisi vulputate fringilla.
                        </p>
                        <div className="border-2 border-gray-800 rounded-lg h-fit">
                          <img
                            src={news_ilu}
                            className="min-w-[90px] h-[100px]"
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                {/* End of News & Guides */}
              </div>
              {/* End Bottom Half */}
            </div>
            {/* End Right Section */}
          </div>
        </div>
      </div>
      ;
    </>
  );
}

export default Stock;
