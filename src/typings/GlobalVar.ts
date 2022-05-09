/* eslint-disable @typescript-eslint/no-explicit-any */
import { Road } from "./Road";

export class GlobalVar {
	public static road = new Road();
	public static cur_id = -1;
}
