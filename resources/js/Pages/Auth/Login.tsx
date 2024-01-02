import React from "react";
import AuthLayout from "@/layouts/AuthLayout";
import { ReactNode } from "react";
import {
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { Head, Link, router, usePage } from "@inertiajs/react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/FormInput";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";

type Data = {
	email: string;
	password: string;
	remember: boolean;
};

export default function Login() {
	const {
		props: { errors }
	} = usePage();

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
			remember: true
		}
	});

	function handleSubmit(values: Data) {
		router.post(route("login"), values);
	}

	return (
		<>
			<Head title="Login" />

			<Button className="absolute right-5 top-5" variant="ghost" asChild>
				<Link href={route("register")}>Register</Link>
			</Button>

			<CardHeader>
				<CardTitle>Login</CardTitle>
				<CardDescription>
					Login to get full access to airbnb
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(handleSubmit)}
						className="w-80 space-y-4"
					>
						<FormInput
							name="email"
							control={form.control}
							error={errors.email}
						/>
						<FormInput
							type="password"
							name="password"
							control={form.control}
							error={errors.password}
						/>

						<div className="flex items-center gap-2">
							<Checkbox
								checked={form.getValues("remember")}
								onCheckedChange={(checked: boolean) =>
									form.setValue("remember", checked)
								}
							/>
							<Label htmlFor="remember">Remember Me</Label>
						</div>

						<Button type="submit" className="w-full">
							Login
						</Button>
					</form>
				</Form>
			</CardContent>
		</>
	);
}

Login.layout = (page: ReactNode) => <AuthLayout>{page}</AuthLayout>;
