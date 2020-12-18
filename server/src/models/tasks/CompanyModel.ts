import { Prop, getModelForClass } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { mongoose } from "@typegoose/typegoose";

/* ============================================================================
                        Argument Type Definition
   ========================================================================= */

/* ============================================================================
                        Input Type Definition
   ========================================================================= */

/* ============================================================================
                        Object Type Definition
   ========================================================================= */

@ObjectType()
export class Company {
  @Field({ name: "id" })
  _id?: string;

  @Prop()
  @Field()
  companyName: string;
}

export const companyModel = getModelForClass(Company, {
  existingMongoose: mongoose
});
