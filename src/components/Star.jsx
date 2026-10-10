import { useCards } from "../hooks/useCards";

const Star = ({ size = 20, stroke = "black",val,cardId,fill }) => {
    
    
    const { updatePriority } = useCards();
    
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 34 31"
            xmlns="http://www.w3.org/2000/svg"
            onClick={()=>updatePriority(val,cardId)}
            className="cursor-pointer hover:scale-130 transition-all"
        >
            <path
                d="M13.6774 1.35294C14.2935 -0.452682 16.8472 -0.452687 17.4632 1.35294L19.8231 8.27013C20.0994 9.07998 20.8603 9.62435 21.716 9.62435H29.1372C31.0982 9.62435 31.8878 12.1532 30.2752 13.269L24.4419 17.3054C23.7065 17.8142 23.3983 18.7494 23.687 19.5958L25.9543 26.2415C26.5771 28.0671 24.5096 29.6295 22.9234 28.532L16.7083 24.2315C16.0236 23.7577 15.117 23.7577 14.4323 24.2315L8.2172 28.532C6.631 29.6295 4.56348 28.0671 5.18631 26.2415L7.4536 19.5958C7.74235 18.7494 7.43414 17.8142 6.69874 17.3054L0.8654 13.269C-0.747186 12.1532 0.0424232 9.62435 2.00342 9.62435H9.42466C10.2803 9.62435 11.0412 9.07998 11.3175 8.27013L13.6774 1.35294Z"
                stroke={stroke}
                fill={fill}
                style={{ filter: "drop-shadow(3px 3px 0 #000)" }}
            />
        </svg>
    );
};

export default Star;
