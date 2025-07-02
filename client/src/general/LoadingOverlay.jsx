import { FadeLoader } from "react-spinners";

const LoadingOverlay = () => {
	return (
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
			<FadeLoader color="#fff" />
		</div>
	);
};

export default LoadingOverlay;
