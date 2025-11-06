import { Tabs, Tab, Card, CardBody } from "@heroui/react";
import React from "react";

interface TabItem {
    id: string;
    label: string | React.ReactNode;
    content: React.ReactNode;
    icon?: React.ReactNode;
}

interface DynamicTabsProps {
    tabs: TabItem[];
    ariaLabel?: string;
    variant?: "solid" | "underlined" | "bordered" | "light";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    fullWidth?: boolean;
    selectedKey?: string;
    defaultSelectedKey?: string;
    onSelectionChange?: (key: string | number) => void;
    className?: string;
    classNames?: {
        base?: string;
        tabList?: string;
        tab?: string;
        tabContent?: string;
        cursor?: string;
        panel?: string;
    };
}

export default function DynamicTabs({
    tabs,
    ariaLabel = "Dynamic tabs",
    variant = "underlined",
    color = "primary",
    size = "md",
    radius = "lg",
    fullWidth = false,
    selectedKey,
    defaultSelectedKey,
    onSelectionChange,
    className,
    classNames,
}: DynamicTabsProps) {
    return (
        <div className={`flex w-full flex-col ${className || ''}`}>
            <Tabs
                aria-label={ariaLabel}
                items={tabs}
                variant={variant}
                color={color}
                size={size}
                radius={radius}
                fullWidth={fullWidth}
                selectedKey={selectedKey}
                defaultSelectedKey={defaultSelectedKey}
                onSelectionChange={onSelectionChange}
                classNames={classNames}
            >
                {(item) => (
                    <Tab
                        key={item.id}
                        title={
                            item.icon ? (
                                <div className="flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </div>
                            ) : (
                                item.label
                            )
                        }
                    >
                        {typeof item.content === 'string' ? (
                            <Card>
                                <CardBody>{item.content}</CardBody>
                            </Card>
                        ) : (
                            item.content
                        )}
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}

export type { TabItem, DynamicTabsProps };
