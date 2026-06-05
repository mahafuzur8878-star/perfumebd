/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { X, Sparkles, Trophy, ArrowRight, ArrowLeft, RefreshCw, ShoppingBag, Eye } from "lucide-react";
import { Product } from "../types";
import { PRODUCTS } from "../data";

interface OlfactoryQuizProps {
  isOpen: boolean;
  onClose: () => void;
  onQuickView: (product: Product) => void;
  onAddToBag: (product: Product) => void;
}

interface Question {
  id: number;
  text: string;
  options: {
    text: string;
    score: Record<string, number>; // Maps product IDs to weights
    desc: string;
  }[];
}

export default function OlfactoryQuiz({
  isOpen,
  onClose,
  onQuickView,
  onAddToBag
}: OlfactoryQuizProps) {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Intro, 1-3 = Quiz, 4 = Recommendation
  const [scores, setScores] = useState<Record<string, number>>({
    "aurum-botanica": 0,
    "santal-noir": 0,
    "rose-silence": 0,
    "midnight-oud": 0,
    "white-vetiver": 0
  });
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);

  if (!isOpen) return null;

  const questions: Question[] = [
    {
      id: 1,
      text: "Which of these environments triggers your deepest memory?",
      options: [
        {
          text: "A sun-drenched meadow at golden hour, filled with wild grasses.",
          score: { "aurum-botanica": 5, "rose-silence": 2 },
          desc: "Warmth, honeyed violet, solar energy."
        },
        {
          text: "A grand historical library in Paris filled with old leather-bound books.",
          score: { "santal-noir": 5, "midnight-oud": 3 },
          desc: "Smoky woods, vintage papyrus, rich amber."
        },
        {
          text: "A crisp rose garden at dawn before the morning dew evaporates.",
          score: { "rose-silence": 5, "white-vetiver": 2 },
          desc: "Fresh morning dew, linen, crystal-clear flora."
        },
        {
          text: "A sea cliff at twilight, salted breeze mixing with pine needles.",
          score: { "white-vetiver": 5, "aurum-botanica": 1 },
          desc: "Salty sea grass, grapefruit zest, clean vetiver."
        }
      ]
    },
    {
      id: 2,
      text: "Describe your personal aesthetic statement.",
      options: [
        {
          text: "Quiet luxury: tailored neutral linens, structured beige tones.",
          score: { "rose-silence": 3, "white-vetiver": 4 },
          desc: "Understated, pure, airy."
        },
        {
          text: "Dramatic mystery: heavy dark velvet clothing, unique silver ornaments.",
          score: { "midnight-oud": 5, "santal-noir": 3 },
          desc: "Intensity, exotic resin, leather."
        },
        {
          text: "Bohemian grandeur: flowing gold silk, warm brass jewelry.",
          score: { "aurum-botanica": 5, "santal-noir": 2 },
          desc: "Gilded, rich, comforting."
        }
      ]
    },
    {
      id: 3,
      text: "Which scent profile brings your mind immediate solace?",
      options: [
        {
          text: "The earthy warmth of wood chips and resinous smoke.",
          score: { "santal-noir": 5, "midnight-oud": 4 },
          desc: "Commanding, dry, architectural."
        },
        {
          text: "The sweet, golden scent of dripping forest honey and absolute jasmine.",
          score: { "aurum-botanica": 5, "rose-silence": 2 },
          desc: "Velvety, botanical, floral-sweet."
        },
        {
          text: "The mineral bite of fresh ocean spray and squeezed grapefruit.",
          score: { "white-vetiver": 5, "rose-silence": 1 },
          desc: "Zesty, stimulating, coastal."
        }
      ]
    }
  ];

  const handleAnswerSelect = (scoreIncrement: Record<string, number>) => {
    const newScores = { ...scores };
    Object.keys(scoreIncrement).forEach((node) => {
      newScores[node] = (newScores[node] || 0) + scoreIncrement[node];
    });
    setScores(newScores);

    if (currentStep < questions.length) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateRecommendation(newScores);
    }
  };

  const calculateRecommendation = (finalScores: Record<string, number>) => {
    let topId = "aurum-botanica";
    let topScore = -1;

    Object.keys(finalScores).forEach((id) => {
      if (finalScores[id] > topScore) {
        topScore = finalScores[id];
        topId = id;
      }
    });

    const matchingProduct = PRODUCTS.find((p) => p.id === topId) || PRODUCTS[0];
    setRecommendedProduct(matchingProduct);
    setCurrentStep(questions.length + 1);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setScores({
      "aurum-botanica": 0,
      "santal-noir": 0,
      "rose-silence": 0,
      "midnight-oud": 0,
      "white-vetiver": 0
    });
    setRecommendedProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" id="quiz-overlay-stage">
      
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/65 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        
        {/* Quiz Window */}
        <div className="w-full max-w-xl bg-white border-2 border-brand-dark rounded-none shadow-[8px_8px_0px_0px_#ff3e00] flex flex-col max-h-[90vh] animate-scaleIn font-sans">
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-brand-dark/15 flex items-center justify-between bg-brand-cream/30">
            <span className="font-mono text-[9px] text-brand-dark/65 uppercase tracking-widest font-black flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-brand-orange animate-pulse" />
              Olfactory Curation Profiler
            </span>
            <button
              onClick={onClose}
              className="p-1 px-2.5 border border-brand-dark/15 hover:bg-brand-orange hover:text-white text-brand-dark rounded-none font-bold cursor-pointer transition-colors"
              id="close-quiz-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Stepper progress bar */}
          {currentStep > 0 && currentStep <= questions.length && (
            <div className="h-1 bg-brand-gray w-full relative">
              <div
                className="h-full bg-brand-orange transition-all duration-300"
                style={{ width: `${(currentStep / questions.length) * 100}%` }}
              />
            </div>
          )}

          {/* Body */}
          <div className="p-6 sm:p-8 flex-grow overflow-y-auto">
            
            {/* Step 0: Welcome Frame */}
            {currentStep === 0 && (
              <div className="text-center space-y-6 py-6 animate-fadeIn" id="quiz-intro-frame">
                <div className="w-16 h-16 bg-brand-orange text-white border border-brand-dark flex items-center justify-center mx-auto rounded-none shadow-[3px_3px_0px_0px_#0f0f0f]">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="space-y-3">
                  <h3 className="font-sans font-black uppercase text-brand-dark text-xl tracking-tight leading-tight">
                    Identify your Olfactory Signature
                  </h3>
                  <p className="text-brand-dark/75 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
                    Answer 3 luxurious sensory questions. Our algorithms will analyze your botanical preferences, color textures, and seasonal moods to match you with your perfect liquid counterpart.
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3.5 bg-brand-orange hover:bg-brand-dark text-white font-black text-xs tracking-wider uppercase rounded-none transition-colors duration-300 inline-flex items-center space-x-2 border-0 focus:outline-none cursor-pointer shadow-[4px_4px_0_0_#0f0f0f]"
                    id="start-quiz-btn"
                  >
                    <span>Begin Examining</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-[9px] text-[#0f0f0f]/40 font-mono font-black uppercase tracking-wider">
                  Takes less than 1 minute • Paris Formulation Standards
                </div>
              </div>
            )}

            {/* Steps 1-3: Question Card */}
            {currentStep > 0 && currentStep <= questions.length && (
              <div className="space-y-6 animate-fadeIn" id={`question-frame-${currentStep}`}>
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-brand-dark/40 uppercase tracking-widest font-black">
                    Inquiry {currentStep} of {questions.length}
                  </span>
                </div>

                <h3 className="font-sans font-black text-brand-dark text-sm sm:text-base leading-relaxed tracking-wider uppercase border-l-3 border-brand-orange pl-3 text-left">
                  {questions[currentStep - 1].text}
                </h3>

                <div className="space-y-3 pt-2">
                  {questions[currentStep - 1].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswerSelect(opt.score)}
                      className="w-full p-4 border border-brand-dark/15 hover:border-brand-dark hover:shadow-[3px_3px_0px_0px_#ff3e00] rounded-none bg-brand-gray text-left transition-all group focus:outline-none cursor-pointer flex justify-between items-center hover:bg-brand-cream/30"
                      id={`opt-btn-${currentStep}-${i}`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <p className="text-xs sm:text-sm font-sans font-black text-brand-dark leading-tight">
                          {opt.text}
                        </p>
                        <p className="text-[10px] text-brand-dark/50 font-mono font-bold uppercase tracking-wider">
                          {opt.desc}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-brand-dark/30 group-hover:text-brand-orange transition-all flex-shrink-0" />
                    </button>
                  ))}
                </div>

                {/* Return trigger */}
                <div className="flex justify-start pt-2">
                  <button
                    onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
                    className="flex items-center space-x-1.5 text-[9px] uppercase font-mono font-black tracking-wider text-brand-dark/45 hover:text-brand-orange cursor-pointer"
                    disabled={currentStep === 1}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Previous Card</span>
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Final Recommendation Frame */}
            {currentStep > questions.length && recommendedProduct && (
              <div className="space-y-6 text-center py-2 animate-fadeIn" id="quiz-matches-frame">
                
                <div className="space-y-1">
                  <span className="font-mono text-[9px] tracking-widest text-[#0c0c0c]/40 uppercase font-black">
                    Your Match Is Formulated
                  </span>
                  <h3 className="font-sans font-black uppercase text-brand-dark text-xl tracking-tight">
                    The Alchemy Harmonizer Match
                  </h3>
                </div>

                {/* Golden Display Card */}
                <div className="max-w-xs mx-auto border-2 border-brand-dark bg-brand-gray rounded-none p-5 shadow-[4px_4px_0_0_#ff3e00] hover:scale-[1.01] transition-transform duration-300">
                  <div className="aspect-square bg-white flex items-center justify-center p-4 rounded-none border border-brand-dark/10 relative">
                    <span className="absolute top-2 left-2 font-mono text-[8px] bg-brand-orange text-white px-2 py-0.5 rounded-none font-black uppercase tracking-wider">
                      98% Matching Profile
                    </span>
                    <img
                      src={recommendedProduct.image}
                      alt={recommendedProduct.name}
                      referrerPolicy="no-referrer"
                      className="max-h-[85%] max-w-[85%] object-contain"
                    />
                  </div>
                  
                  <div className="mt-4 text-center space-y-1">
                    <span className="font-mono text-[9px] text-brand-orange tracking-wider uppercase font-black">
                      {recommendedProduct.concentration}
                    </span>
                    <h4 className="font-sans uppercase font-black tracking-wider text-brand-dark text-sm">
                      {recommendedProduct.name}
                    </h4>
                    <p className="text-brand-dark text-xs font-black">
                      ${recommendedProduct.price.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-brand-dark/65 line-clamp-2 mt-1 leading-tight">
                      {recommendedProduct.description}
                    </p>
                  </div>
                </div>

                {/* Scent structure analysis */}
                <div className="bg-brand-cream/25 p-4 rounded-none text-left border border-brand-dark/15 space-y-2 max-w-md mx-auto font-sans">
                  <span className="font-mono text-[9px] text-brand-dark/40 uppercase tracking-widest font-black block">Matching Elements</span>
                  <ul className="text-xs text-brand-dark/80 space-y-1 list-disc ml-4 leading-normal font-medium">
                    <li>Matches your affinity for <strong className="text-brand-orange uppercase font-black"> {recommendedProduct.category} </strong> notes.</li>
                    <li>Scent architecture includes: <strong className="text-brand-dark font-black">{recommendedProduct.notes.base[0]}</strong> base anchors.</li>
                    <li>Perfect for your preference in morning freshness and velvet clothing density.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-sm mx-auto font-sans">
                  <button
                    onClick={() => {
                      onQuickView(recommendedProduct);
                      onClose();
                    }}
                    className="flex-1 py-3 border-2 border-brand-dark rounded-none font-black text-xs uppercase tracking-wider text-brand-dark hover:bg-brand-dark hover:text-white transition-all cursor-pointer flex items-center justify-center space-x-1"
                    id="match-details-btn"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Olfactory Pyramid</span>
                  </button>

                  <button
                    onClick={() => {
                      onAddToBag(recommendedProduct);
                      onClose();
                    }}
                    className="flex-1 py-3 bg-brand-orange hover:bg-brand-dark text-white rounded-none font-black text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center space-x-1 border-0 shadow-[3px_3px_0_0_#0f0f0f]"
                    id="match-buy-btn"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Purchase Match</span>
                  </button>
                </div>

                {/* Reset test */}
                <div className="pt-2">
                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center space-x-1.5 text-[9px] font-mono tracking-widest uppercase text-brand-dark/50 hover:text-brand-orange cursor-pointer font-black"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Examine Again</span>
                  </button>
                </div>

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
