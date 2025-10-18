import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="circles"
        options={{
          title: '円',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="circle.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="animated"
        options={{
          title: 'アニメ',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="sparkles" color={color} />,
        }}
      />
      <Tabs.Screen
        name="text"
        options={{
          title: 'テキスト',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="textformat" color={color} />,
        }}
      />
      <Tabs.Screen
        name="gesture"
        options={{
          title: 'ジェスチャー',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hand.point.up.left.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="test"
        options={{
          title: 'test',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="hand.point.up.left.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
