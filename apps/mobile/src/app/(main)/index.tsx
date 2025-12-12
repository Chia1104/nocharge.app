import { useMemo } from "react";

import { StatusBar } from "expo-status-bar";
import { Card } from "heroui-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { ActionCard } from "@/components/action-card";
import type { ActionCardProps } from "@/components/action-card";
import { PieChart } from "@/components/charts/pie-chart";
import { ScreenScrollView } from "@/components/screen-scroll-view";
import { useAppTheme } from "@/contexts/app-theme.context";

export default function App() {
  const { isDark } = useAppTheme();
  const { t } = useTranslation();

  const cards = useMemo(() => {
    return [
      {
        title: t("routes.subscription.title"),
        footer: t("routes.subscription.description"),
        path: "/subscription",
      },
      {
        title: t("routes.settings.title"),
        footer: t("routes.settings.description"),
        path: "/settings",
      },
    ] satisfies ActionCardProps[];
  }, [t]);

  return (
    <ScreenScrollView>
      <View className="gap-6 py-10">
        <ActionCard path="/subscription" index={0}>
          <Card.Body className="flex-1 items-center justify-center pt-4 pb-10 relative">
            <View className="absolute bottom-3 left-3 rounded-full">
              <Card.Title className="text-2xl text-foreground/85">
                {t("home.monthly-usage")}
              </Card.Title>
              <Card.Description className="text-foreground/65 pl-0.5">
                {t("home.monthly-per-value", { value: "100 USD" })}
              </Card.Description>
            </View>
            <PieChart
              data={[{ value: 30 }, { value: 60 }, { value: 10 }]}
              size={200}
              strokeWidth={10}
            />
          </Card.Body>
        </ActionCard>
        {cards.map((card, index) => (
          <ActionCard
            key={card.title}
            title={card.title}
            footer={card.footer}
            path={card.path}
            index={index}
          />
        ))}
      </View>
      <StatusBar style={isDark ? "light" : "dark"} />
    </ScreenScrollView>
  );
}
