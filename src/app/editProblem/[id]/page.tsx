import EditProblemForm from './EditProblemForm';

const getTopicById = async (id: string) => {
	try {
		const res = await fetch(`http://localhost:3000/api/problems/${id}`, {
			cache: 'no-store',
		});

		if (!res.ok) {
			throw new Error('Failed to fetch topic');
		}

		return res.json();
	} catch (error) {
		console.log(error);
	}
};

export default async function EditProblem({ params }: any) {
	const { id } = params;
	const { topic } = await getTopicById(id);
	const { title, description, image } = topic;

	return (
		<EditProblemForm
			id={id}
			title={title}
			description={description}
			image={image}
		/>
	);
}
