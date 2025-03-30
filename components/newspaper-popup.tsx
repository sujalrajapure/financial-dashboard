"use client"

import { X } from "lucide-react"

interface NewspaperPopupProps {
  stock: string
  onClose: () => void
}

export function NewspaperPopup({ stock, onClose }: NewspaperPopupProps) {
  // Get stock details based on name
  const getStockDetails = (stockName: string) => {
    const stockDetails: Record<string, any> = {
      "Reliance Industries": {
        headline: "RELIANCE SOARS TO NEW HEIGHTS",
        subheading: "Energy giant shows remarkable growth amid expansion",
        content:
          "Reliance Industries has shown exceptional performance in the last quarter with profits soaring by 45%. Analysts attribute this growth to the company's diversification strategy and aggressive expansion in retail and digital segments.",
        recommendation: "STRONG BUY",
        targetPrice: "₹2,800",
      },
      "HDFC Bank": {
        headline: "HDFC BANK CONTINUES STRONG PERFORMANCE",
        subheading: "Banking giant reports robust quarterly results",
        content:
          "HDFC Bank has reported strong quarterly results, with net profit rising by 22% year-on-year. The bank's asset quality remains robust with low NPAs, and its digital initiatives continue to drive customer acquisition and engagement.",
        recommendation: "BUY",
        targetPrice: "₹1,850",
      },
      Infosys: {
        headline: "INFOSYS FACES HEADWINDS",
        subheading: "IT major reports slower growth amid global tech spending cuts",
        content:
          "Infosys has reported slower growth in the last quarter as global companies cut back on technology spending. The company is focusing on AI and cloud services to offset the impact of reduced spending in traditional IT services.",
        recommendation: "HOLD",
        targetPrice: "₹1,550",
      },
      "Tata Motors": {
        headline: "TATA MOTORS ACCELERATES GROWTH",
        subheading: "Auto giant benefits from strong demand for EVs",
        content:
          "Tata Motors has reported strong quarterly results, driven by robust demand for its electric vehicles and premium JLR models. The company's focus on sustainable mobility and innovation is paying off with increased market share.",
        recommendation: "BUY",
        targetPrice: "₹950",
      },
      "Bharti Airtel": {
        headline: "BHARTI AIRTEL FACES COMPETITIVE PRESSURE",
        subheading: "Telecom giant reports mixed results amid intense competition",
        content:
          "Bharti Airtel has reported mixed quarterly results as intense competition in the telecom sector continues to pressure margins. However, the company's focus on premium customers and value-added services is helping maintain ARPU.",
        recommendation: "HOLD",
        targetPrice: "₹1,050",
      },
      default: {
        headline: "MARKET ANALYSIS",
        subheading: "Expert insights on current market trends",
        content:
          "The stock market has been showing mixed signals with some sectors performing exceptionally well while others face challenges. Experts recommend a balanced portfolio with a mix of growth and value stocks.",
        recommendation: "SECTOR SPECIFIC",
        targetPrice: "VARIES",
      },
    }

    return stockDetails[stockName] || stockDetails.default
  }

  const details = getStockDetails(stock)

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-[#f5f5dc] text-black max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-md shadow-lg transform transition-all">
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-2 right-2 text-black hover:bg-black/10 rounded-full p-1">
            <X className="h-6 w-6" />
          </button>

          <div className="border-b-4 border-black pb-2 mb-4">
            <h1 className="text-4xl font-bold text-center font-serif tracking-tight">THE MARKET CHRONICLE</h1>
            <p className="text-center text-sm">BOMBAY EDITION • {new Date().toLocaleDateString()}</p>
          </div>

          <h2 className="text-3xl font-bold text-center mb-2 font-serif">{details.headline}</h2>
          <p className="text-center text-lg mb-4 italic">{details.subheading}</p>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="col-span-2">
              <p className="text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left">
                {details.content}
              </p>
              <p className="mt-4">
                Market experts suggest that investors should carefully analyze the company's fundamentals before making
                investment decisions. The recent performance indicates a positive trend, but external factors could
                influence future growth.
              </p>
              <p className="mt-4">
                "The market is showing interesting patterns that remind us of historical cycles," says market analyst
                Rakesh Sharma. "Investors should be cautious but not miss out on potential opportunities."
              </p>
            </div>
            <div className="border-l border-black pl-4">
              <h3 className="text-xl font-bold mb-2 font-serif">ANALYST TAKE</h3>
              <div className="mb-4">
                <p className="text-sm font-bold">RECOMMENDATION:</p>
                <p
                  className={`text-xl font-bold ${details.recommendation === "BUY" || details.recommendation === "STRONG BUY" ? "text-green-700" : details.recommendation === "SELL" ? "text-red-700" : "text-yellow-700"}`}
                >
                  {details.recommendation}
                </p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-bold">TARGET PRICE:</p>
                <p className="text-xl font-bold">{details.targetPrice}</p>
              </div>
              <div>
                <p className="text-sm font-bold">RISK LEVEL:</p>
                <div className="w-full bg-gray-300 h-2 mt-1">
                  <div
                    className="bg-yellow-600 h-2"
                    style={{
                      width:
                        details.recommendation === "STRONG BUY"
                          ? "80%"
                          : details.recommendation === "BUY"
                            ? "60%"
                            : details.recommendation === "HOLD"
                              ? "40%"
                              : "20%",
                    }}
                  ></div>
                </div>
                <p className="text-xs mt-1 text-right">
                  {details.recommendation === "STRONG BUY"
                    ? "High Risk, High Reward"
                    : details.recommendation === "BUY"
                      ? "Moderate Risk"
                      : details.recommendation === "HOLD"
                        ? "Low Risk"
                        : "Minimal Risk"}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-black pt-4 text-center text-sm">
            <p>Disclaimer: This newspaper is for entertainment purposes only. Not financial advice.</p>
            <p className="font-bold mt-2">"Risk hai toh ishq hai" - The Market Chronicle</p>
          </div>
        </div>
      </div>
    </div>
  )
}

