import {Prop, Schema} from "@nestjs/mongoose";
import {Types, SchemaTypes} from "mongoose";

//a schema is use as a template because all doc have a id
//we will use reuse this in like a model to create other mougoo doc

@Schema()
export class AbstractDocument {
    @Prop( {type: SchemaTypes.ObjectId} )
    _id: Types.ObjectId;
}