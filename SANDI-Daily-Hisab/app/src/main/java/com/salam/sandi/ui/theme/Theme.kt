package com.salam.sandi.ui.theme

import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable

private val DarkColorScheme = darkColorScheme(
    primary = GoldAccent,
    secondary = IncomeGreen,
    tertiary = ProfitSky,
    background = ObsidianBlack,
    surface = CardNavy,
    onPrimary = ObsidianBlack,
    onBackground = TextWhite,
    onSurface = TextWhite
)

@Composable
fun SANDITheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme = DarkColorScheme,
        typography = Typography,
        content = content
    )
}
