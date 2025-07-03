import { FadeLoader } from "react-spinners";
import { createPortal } from "react-dom";

const LoadingOverlay = () => {
	return createPortal(
		<div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[9999]">
			<FadeLoader color="#fff" />
		</div>,
		document.body
	);
};

export default LoadingOverlay;
