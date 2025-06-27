const ResultList = ({ results = [], renderComponent }) => {
	return results.map((result, index) => (
		<div key={index}>
			<renderComponent result={result} />
		</div>
	));
};

export default ResultList;
