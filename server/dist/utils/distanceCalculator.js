"use strict";
/**
 * Calculate the distance between two coordinates (latitude and longitude) using the Haversine formula.
 *
 * @param lat1 Latitude of the first point
 * @param lon1 Longitude of the first point
 * @param lat2 Latitude of the second point
 * @param lon2 Longitude of the second point
 * @returns The distance between the two points in kilometers
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateDistance = void 0;
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
};
exports.calculateDistance = calculateDistance;
/**
 * Convert degrees to radians.
 *
 * @param degrees Angle in degrees
 * @returns Angle in radians
 */
function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}
//# sourceMappingURL=distanceCalculator.js.map