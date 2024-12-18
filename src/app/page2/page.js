"use client";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QuestionPage() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const currentEmail = localStorage.getItem("emailAddress");

        if (!currentEmail) {
          setError("Email not found. Please return to the previous page.");
          setIsLoading(false);
          return;
        }

        const response = await axios.get(
          `http://localhost:5000/api/progress/${currentEmail}`
        );

        if (response.data.success && response.data.data.Q1) {
          // Set the correct card based on the saved answer
          const savedAnswer = response.data.data.Q1;
          setSelectedCard(
            savedAnswer === "Nike Orange"
              ? 1
              : savedAnswer === "Nike Black"
              ? 2
              : null
          );
        }
      } catch (error) {
        console.error("Error loading progress:", error);
        setError("Error loading your previous answers.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProgress();
  }, []);

  const handleCardClick = async (cardNumber) => {
    // Prevent multiple submissions or clicking the same card
    if (isSubmitting || selectedCard === cardNumber) {
      return;
    }

    try {
      setIsSubmitting(true);

      const currentEmail = localStorage.getItem("emailAddress");

      if (!currentEmail) {
        setError("Email not found. Please return to the previous page.");
        return;
      }

      const answer = cardNumber === 1 ? "Nike Orange" : "Nike Black";

      await Promise.all([
        axios.post("http://localhost:5000/api/submit-question", {
          email: currentEmail,
          questionNumber: 1,
          answer,
        }),
        Promise.resolve(setSelectedCard(cardNumber)),
      ]);

      setError("");
    } catch (error) {
      console.error("Error submitting answer:", error);
      setError("An error occurred. Please try again.");
      setSelectedCard(null);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-l from-[#010101] to-[#4d4d4d] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-l from-[#010101] to-[#4d4d4d] flex flex-col items-center pl-4 lg:pt-6">
      <div className="block sm:hidden sm:ml-2 ">
        <img
          src="Union.PNG"
          alt="Your Image"
          className="w-1/2 h-auto mx-auto top-0 left-0 ml-2 z-10 opacity-65"
        />
        <img
          src="1stshoe.PNG"
          alt="Your Image"
          className="w-3/4 h-auto mx-auto absolute top-5 left-12 filter mix-blend-overlay"
        />
      </div>
      <div className="w-full max-w-2xl mx-auto p-4 lg:pt-8 flex flex-col items-center justify-center h-full">
        <h3 className="text-white font-bold text-center mb-4 lg:mb-8">
          Question 1
        </h3>
        <h1 className="text-white text-2xl lg:text-3xl font-bold text-center mb-6 lg:mb-8">
          What is your preferred choice?
        </h1>

        {error && <div className="text-[#f91c1c] text-sm mb-4">{error}</div>}

        <div className="text-center w-full">
          <div className="flex justify-between gap-2 lg:gap-4 w-full sm:mt-2">
            {/* Card 1 - Nike Orange */}
            <div
              className={`w-full lg:w-[350px] h-[200px] lg:h-[350px] relative bg-[#6d6d6d] rounded-[35px] cursor-pointer ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              } ${selectedCard === 1 ? "border-4 border-[#bbe94a]" : ""}`}
              onClick={() => !isSubmitting && handleCardClick(1)}
            >
              <div className="absolute  pt-3 top-2 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base overflow-hidden whitespace-nowrap text-ellipsis">
                <h3>Nike Orange</h3>
              </div>
              <img
                src="Rectangle1.PNG"
                alt="Nike Orange"
                className="absolute inset-0 max-w-[70%] max-h-[70%] object-contain rounded-[35px] top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2"
              />
              {selectedCard === 1 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 sm:-top-2 md:-top-3">
                  <div className="w-[30px] h-[30px] bg-white rounded-[25px] border-4 border-black" />
                </div>
              )}
            </div>

            {/* Card 2 - Nike Black */}
            <div
              className={`w-full lg:w-[350px] h-[200px] lg:h-[350px] relative bg-[#6d6d6d] rounded-[35px] cursor-pointer ${
                isSubmitting ? "pointer-events-none opacity-50" : ""
              } ${selectedCard === 2 ? "border-4 border-[#bbe94a]" : ""}`}
              onClick={() => !isSubmitting && handleCardClick(2)}
            >
              <div className="absolute pt-3 top-2 left-1/2 transform -translate-x-1/2 text-white text-sm sm:text-base overflow-hidden whitespace-nowrap text-ellipsis">
                <h3>Nike Black</h3>
              </div>
              <img
                src="Rectangle2.PNG"
                alt="Nike Black"
                className="absolute inset-0 max-w-[70%] max-h-[70%] object-contain rounded-[35px] top-1/2 transform -translate-y-1/2 left-1/2 -translate-x-1/2"
              />
              {selectedCard === 2 && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 sm:-top-2 md:-top-3">
                  <div className="w-[30px] h-[30px] bg-white rounded-[25px] border-4 border-black" />
                </div>
              )}
            </div>
          </div>

          <div className="text-[#f91c1c] text-xl mt-4">Please select one</div>

          <div className="flex justify-between gap-3 w-full mt-6">
            {/* Back Button */}
            <Link
              href="/"
              className="w-24 sm:w-42 md:w-40 h-12 sm:h-16 px-3 sm:px-6 bg-[#edb6d2] hover:bg-[#d79c9e] rounded-full flex items-center justify-center transition-colors"
            >
              <div className="w-3 sm:w-4 h-3 sm:h-4 mr-1">
                <img
                  src="Union3.PNG"
                  alt="Back"
                  className="w-full h-full object-contain filter grayscale"
                />
              </div>
              <span className="text-black text-base sm:text-xl font-extrabold ml-3 sm:ml-3">
                Back
              </span>
            </Link>

            {/* Next Button */}
            <Link
              href="/page3"
              className="w-24 sm:w-42 md:w-40 h-12 sm:h-16 px-3 sm:px-6 bg-[#bbe94a] hover:bg-[#a1d26c] rounded-full flex items-center justify-center transition-colors"
            >
              <span className="text-black text-base sm:text-xl font-extrabold mr-3 truncate">
                Next
              </span>{" "}
              <div className="w-3 sm:w-4 h-3 sm:h-4 ml-1 sm:ml-2 flex-shrink-0">
                <img
                  src="Union2.PNG"
                  alt="Home"
                  className="w-full h-full object-contain filter grayscale"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
