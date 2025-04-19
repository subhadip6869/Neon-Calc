import { motion } from "framer-motion";

const ScientificButton = ({ label, onClick, theme }) => (
	<motion.button
		whileHover={{ scale: 1.05 }}
		whileTap={{ scale: 0.95 }}
		onClick={onClick}
		className={`p-3 rounded-lg text-sm font-bold ${
			theme === "dark"
				? "bg-purple-600 text-white hover:bg-purple-500"
				: "bg-indigo-200 text-indigo-800 hover:bg-indigo-300"
		}`}
	>
		{label}
	</motion.button>
);

export default ScientificButton;
