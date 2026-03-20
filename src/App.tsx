import { useState } from "react";
import { ChefHat, RefreshCw, AlertCircle, Utensils } from "lucide-react";

// 1. Define the shapes of your data so TypeScript understands the "Recipe"
interface GarnishDetails {
  name: string;
  desc: string;
  icon: string;
}

interface MenuStructure {
  [family: string]: {
    [scheme: string]: {
      [principle: string]: {
        [garnish: string]: GarnishDetails;
      };
    };
  };
}

const menuData: MenuStructure = {
  "DV-QKD": {
    "Prepare & Measure": {
      "Heisenberg's Uncertainty": {
        "4 Polarization States": {
          name: "BB84",
          desc: "The foundational protocol utilizing four polarization states across two bases to encode information securely.",
          icon: "🍲",
        },
        "2 Non-Orthogonal States": {
          name: "B92",
          desc: "A minimalist variation of BB84 that achieves security using only two non-orthogonal quantum states.",
          icon: "🥗",
        },
        "6 Polarization States": {
          name: "SSP",
          desc: "Increases security at the cost of key rate by adding a third, circular polarization basis to the BB84 framework.",
          icon: "🥘",
        },
        "Anti-PNS Classical Announcement": {
          name: "SARG04",
          desc: "A robust modification of BB84 designed specifically to thwart Photon Number Splitting (PNS) attacks using weak light pulses.",
          icon: "🛡️",
        },
      },
    },
    "Entanglement-Based": {
      "Quantum Entanglement": {
        "Bell's Inequality Test": {
          name: "E91",
          desc: "Utilizes entangled photon pairs and checks for eavesdroppers by testing the violation of Bell's inequalities.",
          icon: "🍝",
        },
        "BB84-Style Sifting": {
          name: "BBM92",
          desc: "An entanglement-based protocol that abandons Bell tests in favor of the standard sifting and error-rate checking of BB84.",
          icon: "🍜",
        },
      },
    },
  },
  "CV-QKD": {
    "Prepare & Measure": {
      "Heisenberg's Uncertainty": {
        "Discrete Squeezed States": {
          name: "Discrete Modulation",
          desc: "Uses standard telecom PIN photo-diodes and coherent homodyne detection with discretely modulated squeezed states.",
          icon: "🍮",
        },
        "Gaussian Squeezed States": {
          name: "Gaussian Protocol",
          desc: "Replaces photon counting with highly efficient homodyne detection using a continuous Gaussian modulation of states.",
          icon: "🍨",
        },
      },
    },
  },
  "DPR-QKD": {
    "Prepare & Measure": {
      "Heisenberg's Uncertainty": {
        "Phase Modulation": {
          name: "DPS",
          desc: "Transmits a sequence of coherent weak laser pulses where the intensity remains constant but the phases modulate.",
          icon: "🍹",
        },
        "Intensity Modulation": {
          name: "COW",
          desc: "Transmits a sequence of coherent weak laser pulses where the phases remain constant but the intensities vary.",
          icon: "🍷",
        },
      },
    },
  },
};

const families = ["DV-QKD", "CV-QKD", "DPR-QKD"];
const schemes = ["Prepare & Measure", "Entanglement-Based"];
const principles = ["Heisenberg's Uncertainty", "Quantum Entanglement"];

export default function QuantumKitchen() {
  const [family, setFamily] = useState("DV-QKD");
  const [scheme, setScheme] = useState("Prepare & Measure");
  const [principle, setPrinciple] = useState("Heisenberg's Uncertainty");

  // 2. Tell TypeScript garnish can be a string OR null
  const [garnish, setGarnish] = useState<string | null>(
    "4 Polarization States"
  );

  const handleReset = () => {
    setFamily("DV-QKD");
    setScheme("Prepare & Measure");
    setPrinciple("Heisenberg's Uncertainty");
    setGarnish("4 Polarization States");
  };

  const currentLevel1 = menuData[family];
  const currentLevel2 = currentLevel1 ? currentLevel1[scheme] : null;
  const availableGarnishesObj = currentLevel2 ? currentLevel2[principle] : null;
  const availableGarnishes = availableGarnishesObj
    ? Object.keys(availableGarnishesObj)
    : [];

  const isValidRecipe = availableGarnishes.length > 0;

  // 3. Add checks to ensure garnish exists in the object before accessing it
  const finalDish =
    isValidRecipe &&
    garnish &&
    availableGarnishesObj &&
    availableGarnishesObj[garnish]
      ? availableGarnishesObj[garnish]
      : null;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans selection:bg-amber-500/30">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8 border-b border-slate-700 pb-6">
          <ChefHat className="text-amber-500 w-10 h-10" />
          <h1 className="text-3xl font-bold tracking-wide">
            The Quantum Kitchen
          </h1>
          <span className="text-slate-400 font-light italic mt-2 ml-4">
            A QKD Protocol Builder
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: The Pantry */}
          <div className="space-y-8">
            <h2 className="text-xl font-semibold text-amber-500 border-b border-amber-500/30 pb-2 inline-block">
              The Pantry (Ingredients)
            </h2>

            {/* Mother Sauce Selection */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3">
                1. Mother Sauce (Protocol Family)
              </h3>
              <div className="flex flex-wrap gap-3">
                {families.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setFamily(f);
                      setGarnish(null);
                    }}
                    className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                      family === f
                        ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Cooking Method Selection */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3">
                2. Cooking Method (Protocol Scheme)
              </h3>
              <div className="flex flex-wrap gap-3">
                {schemes.map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setScheme(s);
                      setGarnish(null);
                    }}
                    className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                      scheme === s
                        ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Flavor Profile Selection */}
            <div>
              <h3 className="text-sm uppercase tracking-wider text-slate-400 mb-3">
                3. Flavor Profile (Principle)
              </h3>
              <div className="flex flex-wrap gap-3">
                {principles.map((p) => (
                  <button
                    key={p}
                    onClick={() => {
                      setPrinciple(p);
                      setGarnish(null);
                    }}
                    className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                      principle === p
                        ? "bg-amber-500/20 border-amber-500 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                        : "bg-slate-800 border-slate-700 hover:border-slate-500 text-slate-300"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Garnish Selection (Conditional) */}
            {isValidRecipe && (
              <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                <h3 className="text-sm uppercase tracking-wider text-amber-400 mb-3">
                  4. The Garnish (Unique Feature)
                </h3>
                <div className="flex flex-wrap gap-3">
                  {availableGarnishes.map((g) => (
                    <button
                      key={g}
                      onClick={() => setGarnish(g)}
                      className={`px-4 py-2 rounded-md border transition-all duration-300 ${
                        garnish === g
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                          : "bg-slate-800 border-slate-700 hover:border-emerald-500/50 text-slate-300"
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: The Tasting Board */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8 relative overflow-hidden flex flex-col justify-center min-h-[400px]">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-500 opacity-50"></div>

            {!isValidRecipe ? (
              <div className="text-center animate-in fade-in duration-500 flex flex-col items-center">
                <AlertCircle className="w-16 h-16 text-rose-500/80 mb-4" />
                <h3 className="text-2xl font-bold text-slate-200 mb-2">
                  Recipe Failed!
                </h3>
                <p className="text-slate-400 max-w-sm">
                  This combination curdles. The literature does not currently
                  support mixing these specific quantum ingredients. Try
                  adjusting your method or flavor profile!
                </p>
              </div>
            ) : !finalDish ? (
              <div className="text-center animate-in fade-in duration-500 flex flex-col items-center">
                <Utensils className="w-16 h-16 text-slate-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-300 mb-2">
                  Awaiting the Garnish...
                </h3>
                <p className="text-slate-400">
                  Select a unique feature from the left to plate your final QKD
                  protocol.
                </p>
              </div>
            ) : (
              <div className="text-center animate-in zoom-in-95 duration-500">
                <div className="text-7xl mb-6 drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  {finalDish.icon}
                </div>
                <div className="inline-block border border-amber-500/30 bg-amber-500/10 text-amber-400 text-sm tracking-widest uppercase px-3 py-1 rounded-full mb-4">
                  The Plated Dish
                </div>
                <h3 className="text-4xl font-extrabold text-white mb-6 tracking-tight">
                  {finalDish.name}
                </h3>
                <div className="bg-slate-900/80 border border-slate-700 p-6 rounded-lg shadow-inner text-left">
                  <h4 className="text-slate-500 uppercase text-xs font-bold mb-2">
                    Chef's Summary
                  </h4>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    {finalDish.desc}
                  </p>
                </div>
              </div>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="absolute bottom-6 right-6 flex items-center space-x-2 text-sm text-slate-500 hover:text-amber-400 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reset Kitchen</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
