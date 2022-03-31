/* eslint-disable react/jsx-pascal-case */
import React from "react";
import Card from "./components/Card";
import Date from "./components/Date";
import IncomeCard from "./components/IncomeCard";
import PieChart from "./components/PieChart";
import Greetings from "./components/Greetings";
import CardTitle from "./components/CardTitle";
import DounatChart from "./components/DounatChart";
import CardBudgets_Item from "./components/CardBudgets_Item";
import CurrentDate from "./components/CurrentDate";
// import CalenderRow from "./components/CalenderRow";
import TransactionItem from "./components/TransactionItem";
import ProfileAvatar from "./components/ProfileAvatar";
import ProfileForm from "./components/ProfileForm";
import CategoryItem from "./components/CategoryItem";
// import CalenderReact from "./components/CalenderReact";

// Icons & Images
import food from "./assets/food.svg";
import car from "./assets/car.svg";
import education from "./assets/education.svg";
import health from "./assets/health.svg";
import clothing from "./assets/clothing.svg";
import alcohol from "./assets/alcohol.svg";
import gear from "./assets/gear.svg";
import house_repair from "./assets/house-repair.svg";
import house from "./assets/house.svg";
import phone from "./assets/phone.svg";
import cinema from "./assets/cinema.svg";

function Home() {
  return (
    <>
      {/* Main Content */}
      <div className="w-[87%] py-4">
        <div className="p-4 h-full flex  relative">
          <div className="border-2 border-gray-800 w-full h-full flex p-4 space-x-4">
            {/* Left Section */}
            <div className="w-[40%] space-y-4 flex flex-col">
              {/* Hello Message */}
              <Greetings>Hello, Rahul</Greetings>
              {/* End of Hello Message */}

              {/* Spending Overview Card */}
              <Card className="items-center">
                <div className="border-2 border-gray-800 rounded-lg px-2 py-1 h-fit space-x-4 font-semibold flex items-center justify-between w-10/12">
                  <span className="flex">Spending Overview</span>
                  <Date />
                </div>
                <div className="flex w-full mt-2 space-x-2 items-center">
                  <IncomeCard />
                  <PieChart />
                  <IncomeCard expenses="true" />
                </div>

                {/* Progress Bar */}
                <div className=" w-full border-t-2 border-b-2 border-gray-800 py-2 px-6">
                  <div className="bg-[#3E4059] text-white rounded-xl  py-1">
                    <span className="pl-3">Monthly Budget</span>
                    <div className="flex w-full items-center pr-4 space-x-3">
                      <div className="h-[10px] flex bg-white rounded-md w-full">
                        {/* You can change the bar percentage below here */}
                        <div className="h-[10px] bg-[#31BACC] w-[70%] rounded-md"></div>
                      </div>
                      <span>75%</span>
                    </div>
                    <span className="pl-3">£350 / £2000</span>
                  </div>
                </div>
              </Card>
              {/* End of Spending Overview Card */}

              {/* Budget Card */}
              <Card row="true" className="w-full space-x-2 grow">
                {/* Left Section Card Budgets */}
                <div className="w-[50%] border-r-2 border-gray-800 pr-1">
                  <CardTitle>Budgets</CardTitle>
                  <Date />
                  <DounatChart />
                </div>

                {/* Right Section Card Budget */}
                {/* Loop Your Budget Items here */}
                <div className="w-[50%] space-y-2">
                  <CardBudgets_Item
                    image={car}
                    title="Transport"
                    start="£100"
                    end="£180"
                  />
                  <CardBudgets_Item
                    image={food}
                    title="Food"
                    start="£100"
                    end="£180"
                  />
                  <CardBudgets_Item
                    image={education}
                    title="Educational Services"
                    start="£100"
                    end="£180"
                  />
                  <CardBudgets_Item
                    image={health}
                    title="Health"
                    start="£100"
                    end="£180"
                  />
                  <CardBudgets_Item
                    image={clothing}
                    title="Clothing & Footwear"
                    start="£100"
                    end="£180"
                  />
                </div>
                {/* End of Budget Right Section */}
              </Card>
              {/* End of Budget Card */}
            </div>
            {/* End of Left Section */}

            {/* Start Middle Sectioon */}
            <div className="w-[30%] space-y-4 h-full flex flex-col ">
              {/* Daily Transaction Card */}
              <Card>
                <CardTitle className="justify-center">
                  Daily Transaction
                </CardTitle>
                <CurrentDate />
                {/* Calender Row Not Working */}
                {/* <CalenderRow /> */}
                {/* Loop Your Transaction Item Here */}
                <div className="space-y-2">
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    price="£30"
                    date="Date: 17-03-2022"
                  />
                  <TransactionItem
                    image={car}
                    title="Tesco Petrol"
                    subTitle="Transport"
                    price="£45"
                    date="Date: 17-03-2022"
                  />
                  <TransactionItem
                    image={alcohol}
                    title="ASDA"
                    subTitle="Alcoholic Beverages"
                    price="£30"
                    date="Date: 17-03-2022"
                  />
                  <TransactionItem
                    image={cinema}
                    title="Odeon Cinema"
                    subTitle="Recreation & Culture"
                    price="£30"
                    date="Date: 17-03-2022"
                  />
                  <TransactionItem
                    image={clothing}
                    title="ASOS"
                    subTitle="Clothing & Footwear"
                    price="£30"
                    date="Date: 17-03-2022"
                  />
                </div>
              </Card>
              {/* End of Daily Transactions Card */}

              {/* Upcoming Bills Card */}
              <Card className="grow ">
                <CardTitle className="justify-center">Upcoming Bills</CardTitle>
                <div className="space-y-2 flex flex-col w-full">
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                  <TransactionItem
                    image={food}
                    title="Sainsburys Groceries"
                    subTitle="Food"
                    dayRemaining="9 Days Remaining"
                    date="Date: 17-03-2022"
                    textColor="text-red-300"
                  />
                </div>
              </Card>
              {/* End of Upcoming Bills Card */}
            </div>
            {/* End of Middle Section */}

            {/* Right Section */}
            <div className="w-[30%] space-y-4">
              {/* Card Profile */}
              <Card>
                <CardTitle className="justify-center" removeButton="true">
                  Profile
                </CardTitle>
                <ProfileAvatar />
                <ProfileForm />
              </Card>
              {/* End of Profile Card */}

              {/* Card Categories  */}
              <Card className="items-center">
                <CardTitle className="justify-center w-[70%]">
                  Categories
                </CardTitle>
                <div className="grid grid-cols-6 gap-2">
                  <CategoryItem image={car} />
                  <CategoryItem image={cinema} />
                  <CategoryItem image={food} />
                  <CategoryItem image={gear} />
                  <CategoryItem image={education} />
                  <CategoryItem image={house_repair} />
                  <CategoryItem image={health} />
                  <CategoryItem image={clothing} />
                  <CategoryItem image={house} />
                  <CategoryItem image={alcohol} />
                  <CategoryItem image={phone} />
                </div>
              </Card>
              {/* End Card Categories  */}

              {/* Calender Card */}
              <Card className="items-center w-full">
                <CardTitle className="justify-center w-[70%]">
                  Calender
                </CardTitle>
                {/* Not Woring */}
                {/* <CurrentDate /> */}
                {/* Not working */}
                {/* <CalenderReact /> */}
              </Card>
              {/* End of Calender Card */}
            </div>
            {/* End of Right Section */}
          </div>
        </div>
        {/* End of Content */}
      </div>
    </>
  );
}

export default Home;
