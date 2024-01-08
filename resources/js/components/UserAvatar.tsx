import React from "react";
import { User } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAvatarFallbackName } from "@/lib/utils";

interface Props {
	user: User;
	className?: string;
}

export default function UserAvatar({ user, className }: Props) {
	return (
		<Avatar className={className}>
			<AvatarImage src={user.image} alt={user.name} />
			<AvatarFallback>{getAvatarFallbackName(user.name)}</AvatarFallback>
		</Avatar>
	);
}
