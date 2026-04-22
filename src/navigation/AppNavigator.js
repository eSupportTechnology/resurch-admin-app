import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";

import { useAuth } from "../context/AuthContext";
import LoginScreen from "../screens/LoginScreen";
import VideoValidationScreen from "../screens/VideoValidationScreen";
import ResearchPapersScreen from "../screens/ResearchPapersScreen";
import InnovationReviewScreen from "../screens/InnovationReviewScreen";
import ResearchReviewScreen from "../screens/ResearchReviewScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TAB_ICONS = {
  VideoValidation: "▶",
  ResearchPapers: "📄",
  InnovationReview: "💬",
  ResearchReview: "📝",
};

const TAB_LABELS = {
  VideoValidation: "Videos",
  ResearchPapers: "Research",
  InnovationReview: "Innov. Reviews",
  ResearchReview: "Research Reviews",
};

function LogoutButton({ onPress }) {
  return (
    <TouchableOpacity
      style={navStyles.logoutBtn}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
    >
      <Text style={navStyles.logoutText}>Logout</Text>
    </TouchableOpacity>
  );
}

function AdminTabs() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => (
          <Text style={{ fontSize: 18, opacity: focused ? 1 : 0.5 }}>
            {TAB_ICONS[route.name]}
          </Text>
        ),
        tabBarLabel: ({ focused }) => (
          <Text style={[navStyles.tabLabel, focused && navStyles.tabLabelActive]}>
            {TAB_LABELS[route.name]}
          </Text>
        ),
        tabBarActiveTintColor: "#E32227",
        tabBarInactiveTintColor: "#98a2b3",
        tabBarStyle: navStyles.tabBar,
        tabBarItemStyle: navStyles.tabBarItem,
        headerStyle: navStyles.header,
        headerTitleStyle: navStyles.headerTitle,
        headerTintColor: "#101828",
        headerRight: () => <LogoutButton onPress={handleLogout} />,
        headerLeft: () => (
          <View style={navStyles.headerLeft}>
            <View style={navStyles.headerBadge}>
              <Text style={navStyles.headerBadgeText}>
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </Text>
            </View>
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="VideoValidation"
        component={VideoValidationScreen}
        options={{ title: "Video Validation" }}
      />
      <Tab.Screen
        name="ResearchPapers"
        component={ResearchPapersScreen}
        options={{ title: "Research Papers" }}
      />
      <Tab.Screen
        name="InnovationReview"
        component={InnovationReviewScreen}
        options={{ title: "Innovation Reviews" }}
      />
      <Tab.Screen
        name="ResearchReview"
        component={ResearchReviewScreen}
        options={{ title: "Research Reviews" }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: "#f2f4f7", alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 16, color: "#E32227", fontWeight: "700" }}>Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <Stack.Screen name="Main" component={AdminTabs} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const navStyles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: { fontSize: 17, fontWeight: "700", color: "#101828" },
  headerLeft: { paddingLeft: 4 },
  headerBadge: {
    width: 32, height: 32, borderRadius: 16,
    backgroundColor: "#E32227", alignItems: "center", justifyContent: "center",
  },
  headerBadgeText: { fontSize: 12, fontWeight: "700", color: "#fff" },
  logoutBtn: {
    paddingHorizontal: 14, paddingVertical: 6,
    backgroundColor: "#fee2e2", borderRadius: 8, marginRight: 4,
  },
  logoutText: { fontSize: 12, fontWeight: "700", color: "#ef4444" },
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e4e7ec",
    height: 70,
    paddingBottom: 10,
    paddingTop: 8,
  },
  tabBarItem: { paddingVertical: 4 },
  tabLabel: { fontSize: 10, fontWeight: "600", color: "#98a2b3", marginTop: 2 },
  tabLabelActive: { color: "#E32227" },
});
