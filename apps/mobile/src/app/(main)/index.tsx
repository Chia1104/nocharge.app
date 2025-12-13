import { useMemo } from "react";

import { useRouter } from "expo-router";
import { Card, Button } from "heroui-native";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import { ActionCard } from "@/components/action-card";
import type { ActionCardProps } from "@/components/action-card";
import { AuthGuard } from "@/components/auth-guard";
import { PieChart } from "@/components/charts/pie-chart";
import { PageLayout } from "@/components/page-layout";

const LoginSession = () => {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <View className="flex-1 items-center justify-center">
      <Button
        onPress={() => router.push("/signin")}
        variant="tertiary"
        className="w-full">
        {t("auth.login")}
      </Button>
    </View>
  );
};

export default function App() {
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
    <PageLayout>
      <View className="gap-6 py-10">
        <AuthGuard disableRedirect fallback={<LoginSession />}>
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
        </AuthGuard>
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
    </PageLayout>
  );
}
