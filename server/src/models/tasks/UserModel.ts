import { Prop, getModelForClass, index } from "@typegoose/typegoose";
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
@index({ email: 1 }, { unique: true })
export class User {
  @Field({ name: "id" })
  _id?: string;

  @Prop()
  @Field()
  email: string;

  @Prop()
  @Field()
  company: string;

  @Prop()
  @Field()
  manager: boolean;

  @Prop()
  @Field()
  idToken: string;
}

export const userModel = getModelForClass(User, {
  existingMongoose: mongoose
});
