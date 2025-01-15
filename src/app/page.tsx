import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

export default function Home() {
    return (
        <div>
            <Input/>
            <Button>Click me</Button>
            <Button variant={"destructive"}>Click me</Button>
            <Button variant={"secondary"}>Click me</Button>
            <Button variant={"ghost"}>Click me</Button>
            <Button variant={"muted"}>Click me</Button>
            <Button variant={"tertiary"}>Click me</Button>

        </div>
    );
}
