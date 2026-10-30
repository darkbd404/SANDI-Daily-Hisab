package com.salam.sandi.ui.components

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.unit.dp
import com.salam.sandi.data.entity.IncomeEntity
import com.salam.sandi.ui.theme.*
import java.text.SimpleDateFormat
import java.util.*

@Composable
fun AddIncomeDialog(
    onDismiss: () -> Unit,
    onSave: (IncomeEntity) -> Unit
) {
    var amountText by remember { mutableStateOf("") }
    var tripDesc by remember { mutableStateOf("") }
    var startLoc by remember { mutableStateOf("ফলকামুড়ী") }
    var destLoc by remember { mutableStateOf("বরুড়া বাজার") }
    var customerName by remember { mutableStateOf("") }
    var isBkash by remember { mutableStateOf(false) }
    var errorMessage by remember { mutableStateOf("") }

    AlertDialog(
        onDismissRequest = onDismiss,
        title = {
            Text(
                text = "নতুন যাত্রীভাড়া / আয় যোগ করুন",
                style = MaterialTheme.typography.titleMedium,
                fontWeight = FontWeight.Bold,
                color = IncomeGreen
            )
        },
        text = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .verticalScroll(rememberScrollState()),
                verticalArrangement = Arrangement.spacedBy(10.dp)
            ) {
                OutlinedTextField(
                    value = amountText,
                    onValueChange = { 
                        amountText = it
                        errorMessage = ""
                    },
                    label = { Text("ভাড়ার পরিমাণ (টাকা / ৳)") },
                    placeholder = { Text("যেমন: ৮৫০") },
                    keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                OutlinedTextField(
                    value = tripDesc,
                    onValueChange = { tripDesc = it },
                    label = { Text("ট্রিপের বিবরণ") },
                    placeholder = { Text("যেমন: সকালের লোকাল ট্রিপ") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    OutlinedTextField(
                        value = startLoc,
                        onValueChange = { startLoc = it },
                        label = { Text("শুরুর স্থান") },
                        modifier = Modifier.weight(1f),
                        singleLine = true
                    )
                    OutlinedTextField(
                        value = destLoc,
                        onValueChange = { destLoc = it },
                        label = { Text("গন্তব্য") },
                        modifier = Modifier.weight(1f),
                        singleLine = true
                    )
                }

                OutlinedTextField(
                    value = customerName,
                    onValueChange = { customerName = it },
                    label = { Text("যাত্রী / কাস্টমারের নাম (অপশনাল)") },
                    modifier = Modifier.fillMaxWidth(),
                    singleLine = true
                )

                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text("পেমেন্ট পদ্ধতি:", style = MaterialTheme.typography.bodyMedium)
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        RadioButton(
                            selected = !isBkash,
                            onClick = { isBkash = false }
                        )
                        Text("নগদ ক্যাশ", style = MaterialTheme.typography.bodySmall)
                        Spacer(modifier = Modifier.width(8.dp))
                        RadioButton(
                            selected = isBkash,
                            onClick = { isBkash = true }
                        )
                        Text("বিকাশ", style = MaterialTheme.typography.bodySmall)
                    }
                }

                if (errorMessage.isNotEmpty()) {
                    Text(
                        text = errorMessage,
                        color = ExpenseRed,
                        style = MaterialTheme.typography.bodySmall
                    )
                }
            }
        },
        confirmButton = {
            Button(
                onClick = {
                    val amountNum = amountText.toDoubleOrNull()
                    if (amountNum == null || amountNum <= 0) {
                        errorMessage = "সঠিক টাকার পরিমাণ লিখুন"
                        return@Button
                    }
                    val todayDate = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault()).format(Date())
                    val currentTime = SimpleDateFormat("HH:mm", Locale.getDefault()).format(Date())
                    val finalDesc = if (tripDesc.isNotBlank()) tripDesc else "$startLoc টু $destLoc"

                    val entity = IncomeEntity(
                        id = "inc-${System.currentTimeMillis()}",
                        amountPoisha = (amountNum * 100).toLong(),
                        date = todayDate,
                        time = currentTime,
                        category = if (isBkash) "RESERVED_TRIP" else "PASSENGER_FARE",
                        tripDescription = finalDesc,
                        customerName = customerName.ifBlank { null },
                        startLocation = startLoc,
                        destination = destLoc,
                        paymentMethod = if (isBkash) "BKASH" else "CASH"
                    )
                    onSave(entity)
                },
                colors = ButtonDefaults.buttonColors(containerColor = IncomeGreen)
            ) {
                Text("সংরক্ষণ করুন", color = ObsidianBlack, fontWeight = FontWeight.Bold)
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("বাতিল", color = MutedSlate)
            }
        }
    )
}
