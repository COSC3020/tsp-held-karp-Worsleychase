function tsp_hk(distances) {
    let n = distances.length;
    if (n <= 1) return 0;
    
    // memoization cache
    let memo = new Map();
    
    function hkMinDist(cities, start) {
        // base case
        if (cities.size == 2) {
            let other = Array.from(cities).find(city => city != start);
            return distances[start][other];
        }
        
        let key = Array.from(cities).sort().join(',') + '|' + start;
        if (memo.has(key)) return memo.get(key);
        
        let minDistance = Infinity;
        
        // try each city 
        for (let city of cities) {
            if (city != start) {
                let remaining = new Set(cities);
                remaining.delete(start);
                
                let distance = hkMinDist(remaining, city) + distances[start][city];
                minDistance = Math.min(minDistance, distance);
            }
        }
        memo.set(key, minDistance);
        return minDistance;
    }
    
    // initial set of cities
    let cities = new Set();
    for (let i = 0; i < n; i++) {
        cities.add(i);
    }
    
    // minimum distance starting from each city
    let minTour = Infinity;
    for (let start = 0; start < n; start++) {
        minTour = Math.min(minTour, hkMinDist(cities, start));
    }
    
    return minTour;
}
