import { Prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";
import { urgency } from "../../types";
import { Task } from "./TaskModel";

@ObjectType()
export class AssignedTask extends Task {
  @Prop()
  assignedTo: string;

  @Prop()
  @Field()
  assignedBy: string;

  @Prop()
  @Field({ nullable: true })
  urgency?: urgency;
}
