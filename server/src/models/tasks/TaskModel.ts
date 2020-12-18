import { Prop } from "@typegoose/typegoose";
import { ObjectType, Field } from "type-graphql";
import { timestamp, Location } from "../../types";

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
export class Task {
  @Field({ name: "id" })
  _id?: string;

  @Prop()
  @Field()
  title!: string;

  @Prop()
  @Field({ nullable: true })
  description?: string;

  @Prop()
  @Field()
  createdBy!: string;

  @Prop()
  @Field({ nullable: true })
  reminder?: timestamp;

  @Prop()
  @Field({ nullable: true })
  expires?: timestamp;

  @Prop()
  @Field({ nullable: true })
  location?: Location;

  @Prop()
  @Field({ nullable: true })
  imgUrl?: string;

  @Prop()
  @Field({ nullable: true })
  audioUrl?: string;

  @Prop()
  @Field({ nullable: true })
  videoUrl?: string;

  @Prop()
  @Field({ nullable: true })
  category?: string;
}
