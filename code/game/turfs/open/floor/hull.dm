
/turf/open/floor/engine/hull
	name = "exterior hull plating"
	desc = "Sturdy exterior hull plating that separates you from the uncaring vacuum of space."
	icon_state = "regular_hull"
	temperature = TCMB

/turf/open/floor/engine/hull/rcd_act(mob/user, obj/item/construction/rcd/the_rcd, passed_mode) //no rcd destroying this flooring
	if(passed_mode == RCD_DECONSTRUCT)
		to_chat(user, "<span class='warning'>The flooring is too thick to be regularly deconstructed!</span>")
		return FALSE
	return ..()

/turf/open/floor/engine/hull/reinforced
	name = "exterior reinforced hull plating"
	desc = "Extremely sturdy exterior hull plating that separates you from the uncaring vacuum of space."
	icon_state = "reinforced_hull"
