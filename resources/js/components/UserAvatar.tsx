import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallbackName } from "@/lib/utils";

interface Props {
	user: User;
}

export default function UserAvatar({ user }: Props) {
	return (
		<Avatar>
			<AvatarImage src={user.image} alt={user.name} />
			<AvatarFallback>{getAvatarFallbackName(user.name)}</AvatarFallback>
		</Avatar>
	);
}
