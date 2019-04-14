import json
import math
import re

SECRET = input("whats the secret?") # get the key and app id (i input these manually so i dont need to push them :))

# get how far each degree of lat and long are worth
def get_distances_per_lat_long(lat, long):
	return [111.32*10**3, 40075 *10**3 * math.cos( lat ) / 360]

# swap values in an array, comes in handy more than youd expect...
def swap(arr):
	return [arr[1], arr[0]]

# given a crime type and its coords, return the bounding boxes for it
def get_bounding_boxes(coordinates):
	
	

	lat_long_values = get_distances_per_lat_long(coordinates[0], coordinates[1]) # get the distances lt and long degrees are each worth
	deltas = [10/lat_long_values[0], 10/lat_long_values[1]] # get the change in lat long

	bottom_right = [coordinates[0] - deltas[0], coordinates[1] - deltas[1]]
	top_left = [coordinates[0] + deltas[0], coordinates[1] + deltas[1]]
	return [top_left, bottom_right]

def remove_sig_figs(coords):
	return [float("{0:.6}".format(coords[0])), float("{0:.6}".format(coords[1]))]

def make_request(start, stop):
	
	with open("crime_data.json") as crime_file:
		data = json.load(crime_file)
		pts = {}
		
		for crime in data["features"]:
			if int(re.sub('[^0-9]','', crime["properties"]["type"])) in [1,2,3,4,7,8,15,18,22] or "POCKET-PICKING" in crime["properties"]["desc"]:
				pts[str(remove_sig_figs(crime["geometry"]["coordinates"]))] = pts.get(str(remove_sig_figs(crime["geometry"]["coordinates"])), 0) - int(re.sub('[^0-9]','', crime["properties"]["type"])) + 26
				# print(crime["properties"]["desc"], crime["properties"]["timestamp"], swap(crime["geometry"]["coordinates"]))
				# print(get_bounding_boxes(crime["properties"]["desc"], swap(crime["geometry"]["coordinates"])))
				if '[-87.6837, 41.9031]' == str(remove_sig_figs(crime["geometry"]["coordinates"])):
					print(crime["properties"]["desc"], crime["properties"]["timestamp"], swap(crime["geometry"]["coordinates"]))
				# all_boxes += [get_bounding_boxes(swap(crime["geometry"]["coordinates"]))]
		sorted_pts = sorted(pts.items(), key=lambda kv: kv[1])[-20:]
		print(sorted_pts)
		sorted_pts = [json.loads(a[0]) for a in sorted_pts]

		all_boxes = []
		for i in sorted_pts:
			all_boxes += [get_bounding_boxes(swap(i))]
		print(all_boxes)
		# all_boxes = all_boxes[-20:] #TODO: sort this somehow?
		#						     The MAX you can have here is 20...
	# print(len(all_boxes))
	avoid_areas = "!".join([str(x[0][0])+","+str(x[0][1])+";"+str(x[1][0])+","+str(x[1][1]) for x in all_boxes])
	# print(avoid_areas)
	request_string = "https://route.api.here.com/routing/7.2/calculateroute.json?" + SECRET + "&waypoint0=geo!" + str(start[0]) + "," + str(start[1]) + "&waypoint1=geo!" + str(stop[0]) + "," + str(stop[1]) + "&mode=fastest;pedestrian;traffic:disabled&avoidareas=" + avoid_areas
	print(request_string)


starting_pt = [52.516858379,13.3884717]
ending_pt = [52.51733824,13.394678415]

make_request(starting_pt, ending_pt)

# print(get_bounding_boxes("ASDF", [41.891794, -87.716198]))