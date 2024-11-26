import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom"; // Import navigate

// Wrapper chính của chatbot
const ChatbotWrapper = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 350px;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
    flex-direction: column;
    transition: height 0.3s ease;
    height: 500px;
    overflow: hidden;
    z-index: 1000; /* Set z-index here */
`;

// Nút để mở/đóng box chat (icon nhỏ)
const ChatIcon = styled.div`
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    background-color: #0084ff;
    border-radius: 50%;
    display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

// Nút X để đóng hộp thoại, đặt ở trên cùng của hộp thoại
const CloseButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    background-color: #f0f0f0;
    border-bottom: 1px solid #ddd;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 20px;
    color: #888;
    cursor: pointer;
`;

// Container chứa các tin nhắn, có thanh cuộn khi tin nhắn nhiều
// const MessagesWrapper = styled.div`
//     flex-grow: 1;
//     max-height: 400px;
//     overflow-y: auto;
//     padding: 15px;
//     display: flex;
//     flex-direction: column;
//     background-color: #f0f0f0;
//     scrollbar-width: thin;
//     scrollbar-color: #888 #f0f0f0;
//     &::-webkit-scrollbar {
//         width: 8px;
//     }
//     &::-webkit-scrollbar-thumb {
//         background-color: #888;
//         border-radius: 10px;
//     }
// `;
const MessagesWrapper = styled.div`
    flex-grow: 1;
    max-height: 400px;
    overflow-y: auto;
    padding: 15px;
    display: flex;
    flex-direction: column; // Chiều dọc
    align-items: flex-start; // Đặt các tin nhắn bên trái
    background-color: #f0f0f0;
    scrollbar-width: thin;
    scrollbar-color: #888 #f0f0f0;

    &::-webkit-scrollbar {
        width: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
    }
`;
// Tin nhắn

// const Message = styled.div`
//     margin: 8px 0;
//     padding: 12px 16px;
//     border-radius: 20px;
//     background-color: ${({ user }) => (user === "bot" ? "#e4e6eb" : "#0084ff")};
//     color: ${({ user }) => (user === "bot" ? "#000" : "#fff")};
//     align-self: ${({ user }) =>
//         user === "bot"
//             ? "flex-start"
//             : "flex-end"}; // Bot ở bên trái, Customer ở bên phải
//     max-width: 70%;
//     word-wrap: break-word;
//     font-size: 14px;
//     line-height: 1.5;
//     box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
// `;

const Message = styled.div`
    margin: 8px 0;
    padding: 12px 16px;
    border-radius: 20px;
    background-color: ${({ user }) => (user === "bot" ? "#e4e6eb" : "#0084ff")};
    color: ${({ user }) => (user === "bot" ? "#000" : "#fff")};
    align-self: ${({ user }) =>
        user === "bot"
            ? "flex-start"
            : "flex-end"}; // Bot ở bên trái, Customer ở bên phải
    max-width: 70%;
    word-wrap: break-word;
    font-size: 14px;
    line-height: 1.5;
    box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
`;

// Khu vực nhập tin nhắn luôn ở dưới cùng
const InputWrapper = styled.div`
    display: flex;
    padding: 12px;
    background-color: white;
`;

const Input = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 14px;
    background-color: #f0f2f5;
    outline: none;
    &:focus {
        border-color: #0084ff;
    }
`;

// Nút gửi tin nhắn
const Button = styled.button`
    background-color: #0084ff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #006bbf;
    }
`;

const ButtonLink = styled.button`
    background-color: #0084ff;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #006bbf;
    }
`;

// Thêm một styled component để hiển thị hình ảnh
const ImageMessage = styled.img`
    max-width: 100%;
    border-radius: 10px;
    margin: 8px 0;
`;
const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate(); // Khởi tạo navigate

    const handleSend = async () => {
        if (!input.trim()) return; // Ngăn gửi tin nhắn trống

        const userMessage = { user: "customer", text: input };
        setMessages((prev) => [...prev, userMessage]);

        setInput("");

        try {
            const response = await fetch("/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ sender: "customer", message: input }),
            });

            const data = await response.json();

            // Kiểm tra nếu có phản hồi từ bot
            // Kiểm tra nếu có phản hồi từ bot
            if (Array.isArray(data) && data.length > 0) {
                const botResponses = data.flatMap((msg) => {
                    // console.log(msg);

                    // Xử lý tin nhắn chứa hình ảnh
                    if (msg.image) {
                        return {
                            user: "bot",
                            image: msg.image, // Lưu URL hình ảnh
                        };
                    }

                    // Xử lý tin nhắn chứa buttons
                    if (msg.buttons) {
                        const buttonMessages = msg.buttons.map((button) => {
                            const cabinMatch = button.payload.match(
                                /'cabin_id': '([^']+)'/
                            );
                            const serviceMatch = button.payload.match(
                                /'service_id': '([^']+)'/
                            );

                            const cabinUrl = cabinMatch ? cabinMatch[1] : null;
                            const serviceUrl = serviceMatch
                                ? serviceMatch[1]
                                : null;

                            console.log(cabinUrl, serviceUrl);

                            // Tạo URL hoặc đối tượng trả về dựa trên loại ID
                            if (cabinUrl) {
                                return {
                                    user: "bot",
                                    text: button.title, // Tiêu đề nút
                                    url: cabinUrl, // URL trích xuất từ cabin_id
                                };
                            } else if (serviceUrl) {
                                return {
                                    user: "bot",
                                    text: button.title, // Tiêu đề nút
                                    url: serviceUrl, // URL trích xuất từ service_id
                                };
                            } else {
                                return {
                                    user: "bot",
                                    text: button.title, // Tiêu đề nút nếu không có ID nào
                                };
                            }
                        });

                        // Trả về mảng button messages
                        return buttonMessages;
                    }

                    // Xử lý tin nhắn văn bản
                    if (msg.text) {
                        return {
                            user: "bot",
                            text: msg.text, // Lưu tin nhắn văn bản
                        };
                    }

                    // Trả về mảng trống nếu không có nội dung phù hợp
                    return [];
                });

                setMessages((prev) => [...prev, ...botResponses]);
            } else {
                const noResponseMessage = {
                    user: "bot",
                    text: "Sorry, I don't understand your request..",
                };
                setMessages((prev) => [...prev, noResponseMessage]);
            }
        } catch (error) {
            console.error("Error:", error);
            const errorMessage = {
                user: "bot",
                text: "An error occurred while sending the request to the bot.",
            };
            setMessages((prev) => [...prev, errorMessage]);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <>
            <ChatIcon isOpen={isOpen} onClick={() => setIsOpen(true)}>
                💬
            </ChatIcon>

            <ChatbotWrapper isOpen={isOpen}>
                <CloseButtonWrapper>
                    <CloseButton onClick={() => setIsOpen(false)}>
                        ×
                    </CloseButton>
                </CloseButtonWrapper>

                <MessagesWrapper>
                    {messages.map((msg, index) => (
                        <Message key={index} user={msg.user}>
                            {msg.image ? (
                                <ImageMessage
                                    src={msg.image}
                                    alt="Bot response"
                                />
                            ) : msg.url ? (
                                <>
                                    <ButtonLink
                                        onClick={() => {
                                            if (msg.url) {
                                                if (
                                                    msg.url.includes("/cabins/")
                                                ) {
                                                    // Điều hướng nếu URL chứa cabins
                                                    navigate(
                                                        `/cabins/${
                                                            msg.url.split(
                                                                "/cabins/"
                                                            )[1]
                                                        }`
                                                    );
                                                } else if (
                                                    msg.url.includes(
                                                        "/services/"
                                                    )
                                                ) {
                                                    // Điều hướng nếu URL chứa services
                                                    navigate(
                                                        `/services/${
                                                            msg.url.split(
                                                                "/services/"
                                                            )[1]
                                                        }`
                                                    );
                                                } else {
                                                    console.warn(
                                                        "Unknown URL format:",
                                                        msg.url
                                                    );
                                                }
                                            } else {
                                                console.error(
                                                    "Invalid URL:",
                                                    msg.url
                                                );
                                            }
                                        }}
                                    >
                                        {msg.text}
                                    </ButtonLink>
                                </>
                            ) : (
                                msg.text
                            )}
                        </Message>
                    ))}
                </MessagesWrapper>

                <InputWrapper>
                    <Input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Enter the message..."
                    />
                    <Button onClick={handleSend}>Send</Button>
                </InputWrapper>
            </ChatbotWrapper>
        </>
    );
};

export default Chatbot;
