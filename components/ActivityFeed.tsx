"use client";

import React, { useEffect, useState } from "react";

interface Activity {
    type: string;
    title: string;
    timestamp: number;
}

export default function ActivityFeed() {
    const [activities, setActivities] = useState<
}