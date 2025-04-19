import { motion } from "framer-motion";
import { useState } from "react";
import { BiHistory } from "react-icons/bi"; // History icon
import { FiMoon, FiSun } from "react-icons/fi"; // Sun/Moon icons
import ScientificButton from "./components/ScientificButton";

const CalculatorButton = ({ value, onClick, theme }) => (
	<motion.button
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		onClick={() => onClick(value)}
		className={`p-4 rounded-xl text-xl font-bold ${
			theme === "dark"
				? "bg-gray-800 text-white hover:bg-gray-700"
				: "bg-indigo-800 bg-opacity-50 text-cyan-300 hover:bg-opacity-70"
		} ${
			["=", "+", "-", "*", "/"].includes(value)
				? theme === "dark"
					? "bg-gray-700"
					: "shadow-lg shadow-blue-500/20"
				: ""
		}`}
	>
		{value}
	</motion.button>
);

export default function App() {
	const [input, setInput] = useState("");
	const [theme, setTheme] = useState("dark");
	const [showHistory, setShowHistory] = useState(false);
	const [history, setHistory] = useState([]);
	const [isScientific, setIsScientific] = useState(false);
	const [memory, setMemory] = useState(0);
	const [currentFunction, setCurrentFunction] = useState(null);

	// Toggle theme (dark/neon)
	const toggleTheme = () => setTheme(theme === "dark" ? "neon" : "dark");

	const handleButtonPress = (value) => {
		if (value === "C") {
			setInput("");
		} else if (value === "=") {
			try {
				const result = eval(input);
				setHistory([...history, `${input} = ${result}`]);
				setInput(String(result));
			} catch {
				setInput("Error");
			}
		} else {
			setInput(input + value);
		}
	};

	const handleScientific = (fn) => {
		const value = parseFloat(input);
		switch (fn) {
			case "sin":
				setInput(Math.sin(value).toString());
				break;
			case "cos":
				setInput(Math.cos(value).toString());
				break;
			case "tan":
				setInput(Math.tan(value).toString());
				break;
			case "log":
				setInput(Math.log10(value).toString());
				break;
			case "square":
				setInput(Math.pow(value, 2).toString());
				break;
			case "sqrt":
				setInput(Math.sqrt(value).toString());
				break;
		}
	};

	return (
		<div
			className={`min-h-screen transition-colors ${
				theme === "dark" ? "bg-gray-900" : "bg-indigo-900"
			}`}
		>
			{/* Floating 3D background (we'll add later) */}

			<div className="container mx-auto p-4 max-w-md relative z-10">
				{/* Header */}
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					className="flex justify-between items-center mb-6"
				>
					<h1
						className={`text-2xl font-bold ${
							theme === "dark" ? "text-white" : "text-cyan-300"
						}`}
					>
						NeonCalc
					</h1>
					<div className="flex gap-2">
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => setIsScientific(!isScientific)}
							className={`p-2 rounded-full ${
								theme === "dark"
									? "bg-gray-800 text-green-400"
									: "bg-indigo-100 text-green-700"
							}`}
						>
							{isScientific ? "Basic" : "Sci"}
						</motion.button>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={toggleTheme}
							className={`p-2 rounded-full ${
								theme === "dark"
									? "bg-gray-800 text-yellow-300"
									: "bg-indigo-800 text-white"
							}`}
						>
							{theme === "dark" ? <FiSun /> : <FiMoon />}
						</motion.button>
						<motion.button
							whileTap={{ scale: 0.9 }}
							onClick={() => setShowHistory(!showHistory)}
							className={`p-2 rounded-full ${
								theme === "dark"
									? "bg-gray-800 text-purple-300"
									: "bg-indigo-800 text-white"
							}`}
						>
							<BiHistory />
						</motion.button>
					</div>
				</motion.div>

				{/* Display Container */}
				<motion.div
					animate={{
						boxShadow:
							theme === "dark"
								? "0 0 15px rgba(34,211,238,0.3)"
								: "0 4px 6px rgba(0,0,0,0.1)",
					}}
					className={`p-4 mb-6 rounded-xl border ${
						theme === "dark"
							? "bg-gray-800 border-gray-700 text-cyan-100"
							: "bg-white border-gray-200 text-slate-800"
					}`}
				>
					{/* Updated Display Logic Here */}
					<div className="text-right text-4xl font-mono">
						{currentFunction
							? `${currentFunction}(${input || "0"})`
							: input || "0"}
					</div>
				</motion.div>

				{/* Keypad (we'll add next) */}
				<div className="grid grid-cols-4 gap-3">
					{/* Scientific Buttons Row 1 (only visible in scientific mode) */}
					{isScientific && (
						<>
							<ScientificButton
								label="sin"
								onClick={() => handleScientific("sin")}
								theme={theme}
							/>
							<ScientificButton
								label="cos"
								onClick={() => handleScientific("cos")}
								theme={theme}
							/>
							<ScientificButton
								label="tan"
								onClick={() => handleScientific("tan")}
								theme={theme}
							/>
							<ScientificButton
								label="log"
								onClick={() => handleScientific("log")}
								theme={theme}
							/>
						</>
					)}

					{/* Scientific Buttons Row 2 (only visible in scientific mode) */}
					{isScientific && (
						<>
							<ScientificButton
								label="x²"
								onClick={() => handleScientific("square")}
								theme={theme}
							/>
							<ScientificButton
								label="√"
								onClick={() => handleScientific("sqrt")}
								theme={theme}
							/>
							<ScientificButton
								label="π"
								onClick={() => setInput(Math.PI.toString())}
								theme={theme}
							/>
							<ScientificButton
								label="M+"
								onClick={() =>
									setMemory(memory + parseFloat(input || 0))
								}
								theme={theme}
							/>
						</>
					)}

					{/* Scientific Buttons Row 3 (only visible in scientific mode) */}
					{isScientific && (
						<>
							<ScientificButton
								label="M-"
								onClick={() =>
									setMemory(memory - parseFloat(input || 0))
								}
								theme={theme}
							/>
							<ScientificButton
								label="MR"
								onClick={() => setInput(memory.toString())}
								theme={theme}
							/>
							<ScientificButton
								label="MC"
								onClick={() => setMemory(0)}
								theme={theme}
							/>
							<div></div> {/* Empty cell for layout */}
						</>
					)}

					{/* Main Calculator Buttons (always visible) */}
					{["7", "8", "9", "/"].map((btn) => (
						<CalculatorButton
							key={btn}
							value={btn}
							onClick={handleButtonPress}
							theme={theme}
						/>
					))}

					{["4", "5", "6", "*"].map((btn) => (
						<CalculatorButton
							key={btn}
							value={btn}
							onClick={handleButtonPress}
							theme={theme}
						/>
					))}

					{["1", "2", "3", "-"].map((btn) => (
						<CalculatorButton
							key={btn}
							value={btn}
							onClick={handleButtonPress}
							theme={theme}
						/>
					))}

					{["C", "0", "=", "+"].map((btn) => (
						<CalculatorButton
							key={btn}
							value={btn}
							onClick={handleButtonPress}
							theme={theme}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
