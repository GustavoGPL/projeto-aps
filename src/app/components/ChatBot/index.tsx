import React, { useCallback, useState } from 'react';
import { AiOutlineMessage } from 'react-icons/ai'; // Ícone de mensagem para o botão do chat
import { IoClose } from 'react-icons/io5'; // Ícone de fechar o chat
import Groq from 'groq-sdk';
import { useMutation } from '@tanstack/react-query';

// Configuração do Groq com a chave da API
const groq = new Groq({
	apiKey: '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',
	dangerouslyAllowBrowser: true,
});

const ChatBot = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [userMessage, setUserMessage] = useState('');
	const [chatMessages, setChatMessages] = useState<string[]>([]);

	// Função para buscar a resposta da IA
	const fetchData = useCallback(async (message: string) => {
		try {
			const response = await groq.chat.completions.create({
				messages: [{ role: 'user', content: message }],
				model: 'llama3-8b-8192',
			});
			return response.choices[0].message.content;
		} catch (err) {
			console.error(err);
		}
	}, []);

	// Mutação para enviar a mensagem do usuário e obter a resposta
	const { mutate, isPending } = useMutation({
		mutationFn: fetchData,
		onSuccess: data => {
			if (data) {
				setChatMessages(prev => [...prev, data]);
			}
			console.log('Data', data);
		},
	});

	// Alterna o estado do chat (aberto/fechado)
	const toggleChat = () => {
		setIsOpen(prev => !prev);
	};

	// Lida com o envio do formulário
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (userMessage.trim() === '') return; // Ignora mensagens vazias
		setChatMessages(prev => [...prev, userMessage]); // Adiciona a mensagem do usuário
		setUserMessage(''); // Limpa o input
		mutate(userMessage); // Chama a mutação para buscar a resposta da IA
	};

	return (
		<div className="fixed bottom-5 right-5">
			<button
				className="bg-blue-600 p-4 rounded-full text-white shadow-lg hover:bg-blue-700 transition"
				onClick={toggleChat}
			>
				{isOpen ? <IoClose size={24} /> : <AiOutlineMessage size={24} />}
			</button>
			{isOpen && (
				<div className="bg-white w-80 h-96 shadow-lg rounded-lg fixed bottom-16 right-5 flex flex-col">
					{/* Cabeçalho do chat */}
					<div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
						<h2 className="text-lg">Chat Bot</h2>
						<button onClick={toggleChat} className="text-white">
							<IoClose size={24} />
						</button>
					</div>
					{/* Área de mensagens */}
					<div className="flex-grow p-4 overflow-y-auto">
						<p className="text-gray-700 mb-4 p-2 border-[1px] w-fit border-blue-500 rounded-lg bg-blue-300">
							Olá! Como posso ajudar?
						</p>
						{chatMessages.map((msg, index) => (
							<div
								className={`flex ${
									index % 2 === 0 ? 'justify-end' : 'justify-start'
								}`}
								key={index}
							>
								<p
									className={`text-gray-700 mb-4 p-2 border-[1px] w-fit rounded-lg ${
										index % 2 === 0
											? 'border-purple-500 bg-purple-300'
											: 'border-blue-500 bg-blue-300'
									}`}
								>
									{msg}
								</p>
							</div>
						))}
						{isPending && (
							<div className="flex justify-start">
								<p className="text-gray-700 mb-4 p-2 border-[1px] w-fit border-yellow-500 rounded-lg bg-yellow-300">
									Aguarde, processando...
								</p>
							</div>
						)}
					</div>
					{/* Área de entrada de mensagens */}
					<div className="p-4 border-t flex items-center">
						<form onSubmit={handleSubmit} className="flex w-full">
							<input
								type="text"
								value={userMessage}
								className="text-black border rounded-lg w-full p-2 text-sm"
								onChange={e => setUserMessage(e.target.value)}
								placeholder="Escreva uma mensagem..."
							/>
							<button
								className="bg-blue-600 text-white p-2 ml-2 rounded-lg hover:bg-blue-700 transition"
								type="submit"
							>
								Enviar
							</button>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default ChatBot;
